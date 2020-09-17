gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=SERVICE_NAME="cloud-run-ts-apollo-graphql" \
  --tag gcr.io/${PROJECT_ID}/${IMAGE}