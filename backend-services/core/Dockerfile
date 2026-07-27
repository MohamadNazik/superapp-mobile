FROM golang:1.25.4-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-w -s" -o core ./cmd/server/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=builder /app/core .
COPY --from=builder /app/migrations ./migrations
RUN adduser -D -u 10014 appuser
USER 10014
EXPOSE 9090
CMD ["./core"]