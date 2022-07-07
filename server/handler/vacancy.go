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

type VacancyHandler interface {
	CreateVacancy(ctx *gin.Context)
	GetVacancyWithID(ctx *gin.Context)
	GetVacancyListForCompany(ctx *gin.Context)
	UpdateVacancy(ctx *gin.Context)
	DeleteVacancy(ctx *gin.Context)
}

type vacancyHandler struct {
	repo repository.VacancyRepository
}

func NewVacancyHandler() VacancyHandler {
	return &vacancyHandler{
		repo: repository.NewVacancyRepository(),
	}
}

// -------------- Create methods -----------------
func (h *vacancyHandler) CreateVacancy(ctx *gin.Context) {
	var vacancy model.Vacancy
	if err := ctx.ShouldBindJSON(&vacancy); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	vacancy, err := h.repo.CreateVacancy(vacancy)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while creating vacancy.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Created Vacancy successfully.",
		zap.String("vacancy", fmt.Sprint(vacancy)),
	)
	ctx.JSON(http.StatusOK, vacancy)
}

// -------------- Read methods ------------------
func (h *vacancyHandler) GetVacancyWithID(ctx *gin.Context) {
	vacancyIDStr := ctx.Param("vacancyID")
	vacancyID, err := uuid.Parse(vacancyIDStr)
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

	vacancy, err := h.repo.GetVacancyWithID(vacancyID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching vacancy using ID.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Get Vacancy with ID fetched successfully.",
		zap.String("vacancy", fmt.Sprint(vacancy)),
	)
	ctx.JSON(http.StatusOK, vacancy)
}

func (h *vacancyHandler) GetVacancyListForCompany(ctx *gin.Context) {
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

	vacancyList, err := h.repo.GetVacancyListForCompany(companyID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching vacancys for company.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Get Vacancy List for vacancy fetched successfully.",
		zap.String("vacancyList", fmt.Sprint(vacancyList)),
	)
	ctx.JSON(http.StatusOK, vacancyList)
}

// -------------- Update methods ------------------
func (h *vacancyHandler) UpdateVacancy(ctx *gin.Context) {
	var vacancy model.Vacancy
	if err := ctx.ShouldBindJSON(&vacancy); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	vacancyIDStr := ctx.Param("vacancyID")
	vacancyID, err := uuid.Parse(vacancyIDStr)
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

	vacancy.ID = vacancyID
	vacancy, err = h.repo.UpdateVacancy(vacancy)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while updaing vacancy details.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Updated Vacancy successfully.",
		zap.String("vacancy", fmt.Sprint(vacancy)),
	)
	ctx.JSON(http.StatusOK, vacancy)
}

// -------------- Delete methods -------------------
func (h *vacancyHandler) DeleteVacancy(ctx *gin.Context) {
	var vacancy model.Vacancy
	vacancyIDStr := ctx.Param("vacancyID")
	vacancyID, err := uuid.Parse(vacancyIDStr)
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

	vacancy.ID = vacancyID
	vacancy, err = h.repo.DeleteVacancy(vacancy)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while deleting vacancy.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Deleted Vacancy successfully.",
		zap.String("vacancy", fmt.Sprint(vacancy)),
	)
	ctx.JSON(http.StatusOK, vacancy)
}
