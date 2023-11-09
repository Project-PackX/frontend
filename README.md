# frontend

## Development

> [!WARNING]  
> This project migrated to Vite, you can find the key differences [here](./docs/vite.md).

1. `npm install`
2. Create a `.env` file based on the `.env.example`
3. Run `npm run dev` (supports hot reload)
4. That's it!

## Docker

The `Dockerfile` found in the repo is used to build a production-ready Docker image of the application.

### Run locally

> [!WARNING]  
> These steps assume that you have properly set up Docker on your local system. You can find the official installation guide [here](https://docs.docker.com/get-docker/).

```bash
cd frontend
docker-compose up -d --build
```

Now the application is available on `http://localhost:3000`!
