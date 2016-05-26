angular.module( 'modernnights.directive', [] )

.directive ( 'dstMainNav', function() {
    return {
      restrict: 'E',
      controller: function( $scope, Auth ) {

        var getUserName = function() {
          Auth.getUserName()
          .then( function( username ) {
            $scope.username = username;
          });
        }

        var init = function() {
          getUserName();
          $scope.signedin = Auth.isAuth();
        }();

        Auth.onSignInChange( function() {
          $scope.signedin = Auth.isAuth();
          getUserName();
        });

        $scope.signout = Auth.signout;

      },
      templateUrl: 'app/directives/dst_main_nav.html'
  }
})

.directive( 'visCharXp', function() {
  return {
    restrict: 'E',
    controller: function( $scope, Character ) {

      Character.getAll()
      .then( function( characters ) {
        var diameter = 500, //max size of the bubbles
            color    = d3.scale.category20b(); //color category

        var bubble = d3.layout.pack()
          .sort( null )
          .size( [diameter, diameter] )
          .padding( 1.5 );

        var svg = d3.select( '.xpByCharacter' )
          .attr( 'width', diameter )
          .attr( 'height', diameter );

        Character.getAll()
        .then( function( characters ) {
          //convert numerical values from strings to numbers
          var data = characters.map( function( d ) {
            d.value = +d['xp'];
            return d;
          });

          //bubbles needs very specific format, convert data to this.
          var nodes = bubble.nodes( {children:characters} ).filter( function( d ) {
            return !d.children;
          });

          //setup the chart
          var bubbles = svg.append( 'g' )
            .attr( 'transform', 'translate(0,0)' )
            .selectAll( '.xpByCharacter' )
            .data( nodes )
            .enter();

          //create the bubbles
          bubbles.append( 'circle' )
            .attr( 'class', 'bubble' )
            .attr( 'r', function( d ) { 
              // area = pi * r * r;
              // r = sqrt( area / pi );
              return d.r;
            })
            .attr( 'cx', function( d ) {
              return d.x;
            })
            .attr( 'cy', function( d ) {
              return d.y;
            })
            .style( 'fill', function( d ) {
              return color( d.value );
            });

          //format the text for each bubble
          bubbles.append( 'text' )
            .attr( 'x', function( d ) {
              return d.x;
            })
            .attr( 'y', function( d ) {
              return d.y - 5;
            })
            .attr( 'text-anchor', 'middle' )
            .text( function( d ){
              return d['name'];
            })
            .style({
              'fill': 'white', 
              'font-family': 'Helvetica Neue, Helvetica, Arial, san-serif',
              'font-size': '12px'
            });

            bubbles.append( 'text' )
              .attr( 'x', function( d ) {
                return d.x;
              })
              .attr( 'y', function( d ) {
                return d.y + 5;
              })
              .attr( 'text-anchor', 'middle' )
              .text( function( d ){
                return d['xp'] + ' xp';
              })
              .style({
                'fill': 'white', 
                'font-family': 'Helvetica Neue, Helvetica, Arial, san-serif',
                'font-size': '12px'
              });
        })
      });
    },
    templateUrl: 'app/directives/vis_char_xp.html'
  }
})
