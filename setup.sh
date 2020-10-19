# Enable Google APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable sourcerepo.googleapis.com
gcloud services enable artifactregistry.googleapis.com

# Create Source Repository
gcloud source repos create $REPO_NAME

# Create Artifact Registry for image
gcloud beta artifacts repositories create $REPO_NAME \
  --repository-format="docker" \
  --location=$LOCATION \
  --description=$DESCRIPTION \
  --async

# Create a build trigger, working on the master branch
gcloud beta builds triggers create cloud-source-repositories \
  --repo $REPO_NAME \
  --branch-pattern "master" \
  --build-config "cloudbuild.yaml"

# Clean git history
rm -rf .git
git init

# Commit code
gcloud init && git config --global credential.https://source.developers.google.com.helper gcloud.sh
git remote add google https://source.developers.google.com/p/$PROJECT_ID/r/$REPO_NAME
git add .
git commit -m "Initial commit"
git push --all google
git push --set-upstream google master