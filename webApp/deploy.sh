BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ "$BRANCH" = "main" ]]
then
    echo "🚀 Write 'prod' to deploy in production"
    echo "Or press [ENTER] to deploy to staging"
    read prod

    if [[ ! -z "$prod" ]] && [ $prod = "prod" ]
    then
        echo "\n\n 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥"
        echo "\n 🔥 Deploying in production 🔥\n"
        echo " 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥\n\n"

        say "deploying dashboard in production" || echo "deploying in production"
        
        firebase use --add lmagptfy
        yarn run build

        # create a release tag and push it
        version=$(date '+web--%Y/%m/%d--%H.%M.%S')
        git tag -a $version -m "WebApp Production release version $version"
        echo "Release tagged $version"
        git push --tags
    fi
else 
    echo "\n❗️ Branch must be master to deploy in production ❗️" 
    exit 1
fi

firebase deploy --only hosting:webapp


# send a notification when deploy is done
terminal-notifier -group 'lmagptfy' -title 'Drive plugin WebApp' -message 'Finished' || echo "done"
say "dashboard deployed" || echo "deployed"