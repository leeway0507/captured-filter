package routes

import (
	"backend/api/handlers"
	"backend/ent"

	"github.com/gofiber/fiber/v2"
)

func StoreRouter(app fiber.Router, session *ent.Client) {

	app.Get("/", handlers.GetStores(session))
	app.Get("/:storeName", handlers.GetStore(session))

}
