package main

import (
	"backend/api/routes"
	"backend/db"
	"backend/ent"
	"log"

	_ "backend/docs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/swagger"
)

// @title CAPTURED BACKEND
// @version 1.0
// @description This is a sample swagger for Fiber
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email fiber@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:8080
// @BasePath /

func main() {
	// Conntec DB
	session := db.Session()
	defer session.Close()

	// Launch App
	app := fiber.New()
	app.Use(cors.New())
	setRoutes(app, session)

	log.Fatal(app.Listen(":8080"))
}

func setRoutes(app *fiber.App, session *ent.Client) {
	app.Get("/docs/*", swagger.HandlerDefault) // default
	routes.ProductRouter(app.Group("/api/product"), session)
	routes.StoreRouter(app.Group("/api/store"), session)
	routes.DeliveryAgencyRouter(app.Group("/api/agency"), session)
}
