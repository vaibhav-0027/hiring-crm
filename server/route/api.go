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
	companyClientHandler := handler.NewCompanyClientHandler()
	vacancyHandler := handler.NewVacancyHandler()

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
		clientRoutes.GET("/all", clientHandler.GetAllClientList)
		clientRoutes.PUT("/:clientID", clientHandler.UpdateClient)
		clientRoutes.DELETE("/:clientID", clientHandler.DeleteClient)
	}

	companyRoutes := apiRoutes.Group("/company", middleware.AuthorizeJWT())
	{
		companyRoutes.POST("/new", companyHandler.CreateCompanyWithDetails)
		companyRoutes.GET("/:companyID", companyHandler.GetCompanyWithID)
		companyRoutes.GET("/all", companyHandler.GetAllCompanyList)
		companyRoutes.PUT("/:companyID", companyHandler.UpdateCompany)
		companyRoutes.DELETE("/:companyID", companyHandler.DeleteCompany)
	}

	companyClientRoutes := apiRoutes.Group("/company-client", middleware.AuthorizeJWT())
	{
		companyClientRoutes.POST("/new", companyClientHandler.CreateCompanyClient)
		companyClientRoutes.GET("/:companyClientID", companyClientHandler.GetCompanyClientWithID)
		companyClientRoutes.GET("/company/:companyID", companyClientHandler.GetCompanyClientListForCompany)
		companyClientRoutes.PUT("/:companyClientID", companyClientHandler.UpdateCompanyClient)
		companyClientRoutes.DELETE("/:companyClientID", companyClientHandler.DeleteCompanyClient)
	}

	vacancyRoutes := apiRoutes.Group("/vacancy", middleware.AuthorizeJWT())
	{
		vacancyRoutes.POST("/new", vacancyHandler.CreateVacancy)
		vacancyRoutes.GET("/:vacancyID", vacancyHandler.GetVacancyWithID)
		vacancyRoutes.GET("/company/:companyID", vacancyHandler.GetVacancyListForCompany)
		vacancyRoutes.PUT("/:vacancyID", vacancyHandler.UpdateVacancy)
		vacancyRoutes.DELETE("/:vacancyID", vacancyHandler.DeleteVacancy)
	}

	return r.Run(address)
}
