package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/vaibhav-0027/hiring-crm/model"
	"github.com/vaibhav-0027/hiring-crm/repository"
	"github.com/vaibhav-0027/hiring-crm/utils"
	"go.uber.org/zap"
)

type CompanyClientHandler interface {
	CreateCompanyClient(ctx *gin.Context)
	GetCompanyClientWithID(ctx *gin.Context)
	GetCompanyClientListForCompany(ctx *gin.Context)
	UpdateCompanyClient(ctx *gin.Context)
	DeleteCompanyClient(ctx *gin.Context)
}

type companyClientHandler struct {
	repo repository.CompanyClientRepository
}

func NewCompanyClientHandler() CompanyClientHandler {
	return &companyClientHandler{
		repo: repository.NewCompanyClientRepository(),
	}
}

// -------------- Create methods -----------------
func (h *companyClientHandler) CreateCompanyClient(ctx *gin.Context) {
	var companyClient model.CompanyClient
	if err := ctx.ShouldBindJSON(&companyClient); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	companyClient, err := h.repo.CreateCompanyClient(companyClient)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while creating companyClient.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Created CompanyClient successfully.",
		zap.String("companyClient", fmt.Sprint(companyClient)),
	)
	ctx.JSON(http.StatusOK, companyClient)
}

// -------------- Read methods ------------------
func (h *companyClientHandler) GetCompanyClientWithID(ctx *gin.Context) {
	companyClientIDStr := ctx.Param("companyClientID")
	companyClientID, err := uuid.Parse(companyClientIDStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	companyClient, err := h.repo.GetCompanyClientWithID(companyClientID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching companyClient using ID.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Get CompanyClient with ID fetched successfully.",
		zap.String("companyClient", fmt.Sprint(companyClient)),
	)
	ctx.JSON(http.StatusOK, companyClient)
}

func (h *companyClientHandler) GetCompanyClientListForCompany(ctx *gin.Context) {
	companyIDStr := ctx.Param("companyID")
	companyID, err := uuid.Parse(companyIDStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	companyClientList, err := h.repo.GetCompanyClientListForCompany(companyID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching companyClients for company.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Get CompanyClient List for vacancy fetched successfully.",
		zap.String("companyClientList", fmt.Sprint(companyClientList)),
	)
	ctx.JSON(http.StatusOK, companyClientList)
}

// -------------- Update methods ------------------
func (h *companyClientHandler) UpdateCompanyClient(ctx *gin.Context) {
	var companyClient model.CompanyClient
	if err := ctx.ShouldBindJSON(&companyClient); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	companyClientIDStr := ctx.Param("companyClientID")
	companyClientID, err := uuid.Parse(companyClientIDStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	companyClient.ID = companyClientID
	companyClient, err = h.repo.UpdateCompanyClient(companyClient)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while updaing companyClient details.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Updated CompanyClient successfully.",
		zap.String("companyClient", fmt.Sprint(companyClient)),
	)
	ctx.JSON(http.StatusOK, companyClient)
}

// -------------- Delete methods -------------------
func (h *companyClientHandler) DeleteCompanyClient(ctx *gin.Context) {
	var companyClient model.CompanyClient
	companyClientIDStr := ctx.Param("companyClientID")
	companyClientID, err := uuid.Parse(companyClientIDStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	companyClient.ID = companyClientID
	companyClient, err = h.repo.DeleteCompanyClient(companyClient)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while deleting companyClient.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Deleted CompanyClient successfully.",
		zap.String("companyClient", fmt.Sprint(companyClient)),
	)
	ctx.JSON(http.StatusOK, companyClient)
}
