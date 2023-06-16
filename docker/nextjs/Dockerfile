FROM node:18.16.0-alpine

#ports
EXPOSE 3000/tcp
EXPOSE 3000/udp

WORKDIR /app/
COPY ./package.json ./

# node-gypのエラーの解消
# [参考]https://qiita.com/maaaashi/items/36afba6787aea95f2f15
RUN apk update && \
    apk upgrade && \
    apk add --no-cache make gcc g++ python3

# Update npm | Install pnpm | Set PNPM_HOME | Install global packages
# [参考]https://github.com/pnpm/pnpm/issues/4837
RUN npm i -g npm@latest; \
 # Install pnpm
 npm install -g pnpm; \
 pnpm --version; \
 pnpm setup; \
 mkdir -p /usr/local/share/pnpm &&\
 export PNPM_HOME="/usr/local/share/pnpm" &&\
 export PATH="$PNPM_HOME:$PATH"; \
 pnpm bin -g &&\
 # Install dependencies
 pnpm install
