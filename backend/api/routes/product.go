package routes

import (
	"backend/api/handlers"
	"backend/ent"

	"github.com/gofiber/fiber/v2"
)

func ProductRouter(app fiber.Router, session *ent.Client) {

	app.Get("/", handlers.GetProducts(session))
	app.Get("/filter-meta", handlers.GetFilterMeta(session))
	app.Get("/:id", handlers.GetProduct(session))

}
