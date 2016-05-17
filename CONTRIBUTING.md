# How To Contribute

## Git Workflow:

### Getting Started:

1. Fork a copy of github.com/modernnights/modernnights to your github profile

2. Clone a copy of YOUR FORK to your local machine
  * ```git clone <your repo> && cd modernnights```

3. On your local repository, add github.com/modernnights/modernnights as a remote called 'upstream'
  * ```git remote add upstream https://github.com/modernnights/modernnights.git```

4. Disable pushing to upstream
  * ```git remote set-url --push upstream no_push```

### Making a Feature:
Now that you've got your local repository set up and ready to go, it's time to start working on a feature!

1. Cut a branch
  * ```git checkout -b <feature name>```

2. Do some work. Commit this work. Continue doing this until your feature is complete.
  * ```git add <things>```
  * ```git commit```
  * Commit messages should be short, and in declarative form: 'generate README.md file` is good, `this generates the readme` is bad
  * You should commit early and often, meaning after any individual change. Try not to lump many changes into one commit.

3. Rebase with the current production branch to make certain that things have not broken in the meantime.
  * ```git pull --rebase upstream master```

4. Resolve any conflicts. Make sure you test your code.

5. Push this feature branch to your github repository (not the organization's repository)
  * ```git push origin <branchname>```

6. Navigate to github.com and create a pull request from your github repo to merge with the organization's repo. If this resolves an open issue, make sure to describe the pull request with 'resolves #<issue number>'.

7. Ask someone to review your code. They will merge the pull request when the code review is complete.