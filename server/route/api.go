package route

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/vaibhav-0027/hiring-crm/handler"
	"github.com/vaibhav-0027/hiring-crm/middleware"
)

func RunAPI(address string) error {
	candidateHandler := handler.NewCandidateHandler()
	clientHandler := handler.NewClientHandler()
	companyHandler := handler.NewCompanyHandler()
	contactHandler := handler.NewContactHandler()
	vacancyHandler := handler.NewVacancyHandler()
	roleHandler := handler.NewRoleHandler()

	r := gin.New()
	// r.Use(cors.Default())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*", "https://localhost:3000", "http://localhost:3000"},
		AllowMethods:     []string{"POST", "GET", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"X-Requested-With", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "localhost:3000"
		},
	}))

	r.GET("/ping", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "pong")
	})

	apiRoutes := r.Group("/api")

	candidateRoutes := apiRoutes.Group("/candidate", middleware.AuthorizeJWT())
	{
		candidateRoutes.POST("/new", candidateHandler.CreateCandidate)
		candidateRoutes.GET("/:candidateID", candidateHandler.GetCandidateWithID)
		candidateRoutes.GET("/vacancy/:vacancyID", candidateHandler.GetCandidateListForVacancy)
		candidateRoutes.PUT("/:candidateID", candidateHandler.UpdateCandidate)
		candidateRoutes.DELETE("/:candidateID", candidateHandler.DeleteCandidate)
	}

	clientRoutes := apiRoutes.Group("/client", middleware.AuthorizeJWT())
	{
		clientRoutes.POST("/new", clientHandler.CreateClient)
		clientRoutes.GET("/:clientID", clientHandler.GetClientWithID)
		clientRoutes.GET("/role/:roleID", clientHandler.GetAllClientForRole)
		clientRoutes.GET("/all", clientHandler.GetAllClientList)
		clientRoutes.PUT("/:clientID", clientHandler.UpdateClient)
		clientRoutes.DELETE("/:clientID", clientHandler.DeleteClient)
	}

	roleRoutes := apiRoutes.Group("/role", middleware.AuthorizeJWT())
	{
		roleRoutes.POST("/new", roleHandler.CreateRoleWithDetails)
		roleRoutes.GET("/all", roleHandler.GetAllRolesList)
		roleRoutes.GET("/all/map", roleHandler.GetRolesIdNameMap)
		roleRoutes.GET("/:roleID", roleHandler.GetRoleById)
		roleRoutes.PUT("/:roleID", roleHandler.UpdateRole)
		roleRoutes.DELETE("/:roleID", roleHandler.DeleteRole)
	}

	companyRoutes := apiRoutes.Group("/company", middleware.AuthorizeJWT())
	{
		companyRoutes.POST("/new", companyHandler.CreateCompanyWithDetails)
		companyRoutes.GET("/:companyID", companyHandler.GetCompanyWithID)
		companyRoutes.GET("/all", companyHandler.GetAllCompanyList)
		companyRoutes.GET("/all/map", companyHandler.GetCompanyIdNameMap)
		companyRoutes.PUT("/:companyID", companyHandler.UpdateCompany)
		companyRoutes.DELETE("/:companyID", companyHandler.DeleteCompany)
	}

	contactRoutes := apiRoutes.Group("/contact", middleware.AuthorizeJWT())
	{
		contactRoutes.POST("/new", contactHandler.CreateContact)
		contactRoutes.GET("/all", contactHandler.GetAllContactList)
		contactRoutes.GET("/:contactID", contactHandler.GetContactWithID)
		contactRoutes.GET("/company/:companyID", contactHandler.GetContactListForCompany)
		contactRoutes.PUT("/:contactID", contactHandler.UpdateContact)
		contactRoutes.DELETE("/:contactID", contactHandler.DeleteContact)
	}

	vacancyRoutes := apiRoutes.Group("/vacancy", middleware.AuthorizeJWT())
	{
		vacancyRoutes.POST("/new", vacancyHandler.CreateVacancy)
		vacancyRoutes.GET("/all", vacancyHandler.GetAllVacancyList)
		vacancyRoutes.GET("/:vacancyID", vacancyHandler.GetVacancyWithID)
		vacancyRoutes.GET("/company/:companyID", vacancyHandler.GetVacancyListForCompany)
		vacancyRoutes.PUT("/:vacancyID", vacancyHandler.UpdateVacancy)
		vacancyRoutes.DELETE("/:vacancyID", vacancyHandler.DeleteVacancy)
	}

	return r.Run(address)
}
