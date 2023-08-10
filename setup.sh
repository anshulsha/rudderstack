echo "Running docker compose down command"

docker-compose down

echo "Running docker rmi command"

docker rmi rudderstack

# echo "Cleaning system"

# docker system prune -af

echo "Running docker compose up command"

docker-compose up 
