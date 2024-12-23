FROM docker.io/denoland/deno:2.1.4

WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deno.json is modified).
# Ideally cache deno.json will download and compile _all_ external files used in main.ts.
COPY deno.json .
RUN deno install --entrypoint deno.json

# These steps will be re-run upon each file change in your working directory:
COPY . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache --allow-import bot.ts

CMD ["-INE", "bot.ts"]
