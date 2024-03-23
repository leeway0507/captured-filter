# Use 'scratch' image for super-mini build.
FROM scratch AS prod

# Copy our compiled executable from the last stage.
COPY fiberGo .
COPY .env.production go.mod /

# Run application and expose port 8080.
EXPOSE 8080
CMD ["./fiberGo"]