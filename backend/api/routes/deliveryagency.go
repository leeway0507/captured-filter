package routes

import (
	"backend/api/handlers"
	"backend/ent"

	"github.com/gofiber/fiber/v2"
)

func DeliveryAgencyRouter(app fiber.Router, session *ent.Client) {

	app.Get("/", handlers.GetDeliveryAgencies(session))
	app.Get("/:id", handlers.GetDeliveryAgency(session))

}
