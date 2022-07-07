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

type CompanyHandler interface {
	// CreateCompanyWithLinkedin(*gin.Context)
	CreateCompanyWithDetails(ctx *gin.Context)
	GetCompanyWithID(ctx *gin.Context)
	GetAllCompanyList(ctx *gin.Context)
	UpdateCompany(ctx *gin.Context)
	DeleteCompany(ctx *gin.Context)
}

type companyHandler struct {
	repo repository.CompanyRepository
}

func NewCompanyHandler() CompanyHandler {
	return &companyHandler{
		repo: repository.NewCompanyRepository(),
	}
}

// ----------------- Create methods ------------------
func (h *companyHandler) CreateCompanyWithLinkedin(ctx *gin.Context) {
	// TODO: implement using linkedin API
}

func (h *companyHandler) CreateCompanyWithDetails(ctx *gin.Context) {
	var company model.Company
	// utils.Logger.Debug(
	// 	"incoming context",
	// 	zap.String("ctx", fmt.Sprint(ctx.Keys)),
	// )
	
	if err := ctx.ShouldBindJSON(&company); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	// utils.Logger.Debug(
	// 	"after getting info from ctx",
	// 	zap.String("company", fmt.Sprint(company)),
	// )

	company, err := h.repo.CreateCompanyWithDetails(company)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while creating company with details.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"CreatedCompanyWithDetails successfully.",
		zap.String("company", fmt.Sprint(company)),
	)
	ctx.JSON(http.StatusOK, company)
}

// ----------------- Read methods ---------------------
func (h *companyHandler) GetCompanyWithID(ctx *gin.Context) {
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

	company, err := h.repo.GetCompanyWithID(companyID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching company using ID.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"GetCompanyWithID fetched successfully.",
		zap.String("company", fmt.Sprint(company)),
	)
	ctx.JSON(http.StatusOK, company)
}

func (h *companyHandler) GetAllCompanyList(ctx *gin.Context) {
	companyList, err := h.repo.GetAllCompanyList()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching company list.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"GetAllCompanyList fetched successfully.",
		zap.String("company", fmt.Sprint(companyList)),
	)
	ctx.JSON(http.StatusOK, companyList)
}

// ------------------ Update methods -------------------
func (h *companyHandler) UpdateCompany(ctx *gin.Context) {
	var company model.Company
	if err := ctx.ShouldBindJSON(&company); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

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

	company.ID = companyID
	company, err = h.repo.UpdateCompany(company)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while updaing company details.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"UpdatedCompany successfully.",
		zap.String("company", fmt.Sprint(company)),
	)
	ctx.JSON(http.StatusOK, company)
}

// ------------------ Delete methods -------------------
func (h *companyHandler) DeleteCompany(ctx *gin.Context) {
	var company model.Company
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

	company.ID = companyID
	company, err = h.repo.DeleteCompany(company)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while deleting company.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Deleted Company successfully.",
		zap.String("company", fmt.Sprint(company)),
	)
	ctx.JSON(http.StatusOK, company)
}
