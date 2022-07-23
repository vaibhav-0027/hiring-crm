package handler

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/vaibhav-0027/hiring-crm/model"
	"github.com/vaibhav-0027/hiring-crm/repository"
	"github.com/vaibhav-0027/hiring-crm/utils"
	"go.uber.org/zap"
)

type CandidateHandler interface {
	CreateCandidate(ctx *gin.Context)
	GetCandidateWithID(ctx *gin.Context)
	GetCandidateListForVacancy(ctx *gin.Context)
	UpdateCandidate(ctx *gin.Context)
	DeleteCandidate(ctx *gin.Context)
}

type candidateHandler struct {
	repo repository.CandidateRepository
}

func NewCandidateHandler() CandidateHandler {
	return &candidateHandler{
		repo: repository.NewCandidateRepository(),
	}
}

// -------------- Create methods -----------------
func (h *candidateHandler) CreateCandidate(ctx *gin.Context) {
	var candidate model.Candidate
	if err := ctx.ShouldBindJSON(&candidate); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":     err.Error(),
			"candidate": candidate,
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	candidate, err := h.repo.CreateCandidate(candidate)
	if err != nil {
		errMsg := err.Error()
		if strings.Contains(errMsg, "already exists") {
			ctx.JSON(http.StatusForbidden, gin.H{
				"error": errMsg,
				"msg":   "This candidate already exists!",
			})
			return
		}

		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": errMsg,
		})
		utils.Logger.Debug(
			"Internal server error while creating candidate.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Created Candidate successfully.",
		zap.String("candidate", fmt.Sprint(candidate)),
	)
	ctx.JSON(http.StatusOK, candidate)
}

// -------------- Read methods ------------------
func (h *candidateHandler) GetCandidateWithID(ctx *gin.Context) {
	candidateIDStr := ctx.Param("candidateID")
	candidateID, err := uuid.Parse(candidateIDStr)
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

	candidate, err := h.repo.GetCandidateWithID(candidateID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching candidate using ID.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Get Candidate with ID fetched successfully.",
		zap.String("candidate", fmt.Sprint(candidate)),
	)
	ctx.JSON(http.StatusOK, candidate)
}

func (h *candidateHandler) GetCandidateListForVacancy(ctx *gin.Context) {
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

	candidateList, err := h.repo.GetCandidateListForVacancy(vacancyID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while fetching candidates for vacancy.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Get Candidate List for vacancy fetched successfully.",
		zap.String("candidateList", fmt.Sprint(candidateList)),
	)
	ctx.JSON(http.StatusOK, candidateList)
}

// -------------- Update methods ------------------
func (h *candidateHandler) UpdateCandidate(ctx *gin.Context) {
	var candidate model.Candidate
	if err := ctx.ShouldBindJSON(&candidate); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Received bad request from the client.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
		)
		return
	}

	candidateIDStr := ctx.Param("candidateID")
	candidateID, err := uuid.Parse(candidateIDStr)
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

	candidate.ID = candidateID
	candidate, err = h.repo.UpdateCandidate(candidate)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while updaing candidate details.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Updated Candidate successfully.",
		zap.String("candidate", fmt.Sprint(candidate)),
	)
	ctx.JSON(http.StatusOK, candidate)
}

// -------------- Delete methods -------------------
func (h *candidateHandler) DeleteCandidate(ctx *gin.Context) {
	var candidate model.Candidate
	candidateIDStr := ctx.Param("candidateID")
	candidateID, err := uuid.Parse(candidateIDStr)
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

	candidate.ID = candidateID
	candidate, err = h.repo.DeleteCandidate(candidate)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		utils.Logger.Debug(
			"Internal server error while deleting candidate.",
			zap.String("request", fmt.Sprint(ctx.Keys)),
			zap.Error(err),
		)
		return
	}

	utils.Logger.Debug(
		"Deleted Candidate successfully.",
		zap.String("candidate", fmt.Sprint(candidate)),
	)
	ctx.JSON(http.StatusOK, candidate)
}
