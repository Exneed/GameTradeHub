"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export interface FilterState {
  searchQuery: string
  selectedGame: string
  selectedRank?: string
  priceRange: [number, number]
  budgetRange?: [number, number]
  sortBy: string
  statusFilter?: string
  typeFilter?: string
  minRating?: number
  showFilters: boolean
}

export interface FilterOptions {
  games?: string[]
  ranks?: string[]
  sortOptions?: { value: string; label: string }[]
  priceMax?: number
  budgetMax?: number
  enableUrlSync?: boolean
  debounceMs?: number
}

export function useFilters(initialState: Partial<FilterState>, options: FilterOptions = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    games = ["Tümü"],
    ranks = ["Tümü"],
    sortOptions = [
      { value: "newest", label: "En Yeni" },
      { value: "price-low", label: "Fiyat (Düşük)" },
      { value: "price-high", label: "Fiyat (Yüksek)" },
      { value: "popular", label: "En Popüler" },
    ],
    priceMax = 5000,
    budgetMax = 1000,
    enableUrlSync = false,
    debounceMs = 300,
  } = options

  // Initialize state from URL params if enabled
  const getInitialState = useCallback((): FilterState => {
    const defaultState: FilterState = {
      searchQuery: "",
      selectedGame: "Tümü",
      selectedRank: "Tümü",
      priceRange: [0, priceMax],
      budgetRange: [0, budgetMax],
      sortBy: "newest",
      statusFilter: "all",
      typeFilter: "all",
      minRating: 0,
      showFilters: false,
      ...initialState,
    }

    if (enableUrlSync) {
      return {
        ...defaultState,
        searchQuery: searchParams.get("q") || defaultState.searchQuery,
        selectedGame: searchParams.get("game") || defaultState.selectedGame,
        selectedRank: searchParams.get("rank") || defaultState.selectedRank || "Tümü",
        sortBy: searchParams.get("sort") || defaultState.sortBy,
        statusFilter: searchParams.get("status") || defaultState.statusFilter,
        typeFilter: searchParams.get("type") || defaultState.typeFilter,
      }
    }

    return defaultState
  }, [searchParams, initialState, priceMax, budgetMax, enableUrlSync])

  const [filters, setFilters] = useState<FilterState>(getInitialState)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(filters.searchQuery)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(filters.searchQuery)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [filters.searchQuery, debounceMs])

  // Update URL when filters change (if enabled)
  useEffect(() => {
    if (!enableUrlSync) return

    const params = new URLSearchParams()

    if (debouncedSearchQuery.trim()) params.set("q", debouncedSearchQuery)
    if (filters.selectedGame !== "Tümü") params.set("game", filters.selectedGame)
    if (filters.selectedRank && filters.selectedRank !== "Tümü") params.set("rank", filters.selectedRank)
    if (filters.sortBy !== "newest") params.set("sort", filters.sortBy)
    if (filters.statusFilter && filters.statusFilter !== "all") params.set("status", filters.statusFilter)
    if (filters.typeFilter && filters.typeFilter !== "all") params.set("type", filters.typeFilter)

    const newUrl = params.toString() ? `?${params.toString()}` : ""
    router.replace(newUrl, { scroll: false })
  }, [
    debouncedSearchQuery,
    filters.selectedGame,
    filters.selectedRank,
    filters.sortBy,
    filters.statusFilter,
    filters.typeFilter,
    enableUrlSync,
    router,
  ])

  // Filter update functions
  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const updateSearchQuery = useCallback(
    (query: string) => {
      updateFilter("searchQuery", query)
    },
    [updateFilter],
  )

  const updateGame = useCallback(
    (game: string) => {
      updateFilter("selectedGame", game)
    },
    [updateFilter],
  )

  const updateRank = useCallback(
    (rank: string) => {
      updateFilter("selectedRank", rank)
    },
    [updateFilter],
  )

  const updatePriceRange = useCallback(
    (range: [number, number]) => {
      updateFilter("priceRange", range)
    },
    [updateFilter],
  )

  const updateBudgetRange = useCallback(
    (range: [number, number]) => {
      updateFilter("budgetRange", range)
    },
    [updateFilter],
  )

  const updateSortBy = useCallback(
    (sort: string) => {
      updateFilter("sortBy", sort)
    },
    [updateFilter],
  )

  const updateStatusFilter = useCallback(
    (status: string) => {
      updateFilter("statusFilter", status)
    },
    [updateFilter],
  )

  const updateTypeFilter = useCallback(
    (type: string) => {
      updateFilter("typeFilter", type)
    },
    [updateFilter],
  )

  const updateMinRating = useCallback(
    (rating: number) => {
      updateFilter("minRating", rating)
    },
    [updateFilter],
  )

  const toggleFilters = useCallback(() => {
    updateFilter("showFilters", !filters.showFilters)
  }, [filters.showFilters, updateFilter])

  // Reset filters
  const resetFilters = useCallback(() => {
    const resetState = getInitialState()
    setFilters({
      ...resetState,
      searchQuery: "",
      selectedGame: "Tümü",
      selectedRank: "Tümü",
      priceRange: [0, priceMax],
      budgetRange: [0, budgetMax],
      sortBy: "newest",
      statusFilter: "all",
      typeFilter: "all",
      minRating: 0,
      showFilters: filters.showFilters, // Keep current filter visibility
    })
  }, [getInitialState, priceMax, budgetMax, filters.showFilters])

  // Generic filter function for arrays
  const filterItems = useCallback(
    <T extends Record<string, any>>(
      items: T[],
      filterConfig: {
        searchFields?: (keyof T)[]
        gameField?: keyof T
        rankField?: keyof T
        priceField?: keyof T
        budgetField?: keyof T
        statusField?: keyof T
        typeField?: keyof T
        ratingField?: keyof T
        dateField?: keyof T
      },
    ): T[] => {
      let filtered = [...items]

      // Text search
      if (debouncedSearchQuery.trim() && filterConfig.searchFields) {
        const query = debouncedSearchQuery.toLowerCase()
        filtered = filtered.filter((item) =>
          filterConfig.searchFields!.some((field) => String(item[field]).toLowerCase().includes(query)),
        )
      }

      // Game filter
      if (filters.selectedGame !== "Tümü" && filterConfig.gameField) {
        filtered = filtered.filter((item) => item[filterConfig.gameField!] === filters.selectedGame)
      }

      // Rank filter
      if (filters.selectedRank && filters.selectedRank !== "Tümü" && filterConfig.rankField) {
        filtered = filtered.filter((item) => item[filterConfig.rankField!] === filters.selectedRank)
      }

      // Price range filter
      if (filterConfig.priceField) {
        filtered = filtered.filter((item) => {
          const price = Number(item[filterConfig.priceField!])
          return price >= filters.priceRange[0] && price <= filters.priceRange[1]
        })
      }

      // Budget range filter
      if (filterConfig.budgetField && filters.budgetRange) {
        filtered = filtered.filter((item) => {
          const budget = Number(item[filterConfig.budgetField!])
          return budget >= filters.budgetRange![0] && budget <= filters.budgetRange![1]
        })
      }

      // Status filter
      if (filters.statusFilter && filters.statusFilter !== "all" && filterConfig.statusField) {
        filtered = filtered.filter((item) => item[filterConfig.statusField!] === filters.statusFilter)
      }

      // Type filter
      if (filters.typeFilter && filters.typeFilter !== "all" && filterConfig.typeField) {
        filtered = filtered.filter((item) => item[filterConfig.typeField!] === filters.typeFilter)
      }

      // Rating filter
      if (filters.minRating && filters.minRating > 0 && filterConfig.ratingField) {
        filtered = filtered.filter((item) => Number(item[filterConfig.ratingField!]) >= filters.minRating!)
      }

      // Sorting
      switch (filters.sortBy) {
        case "price-low":
          if (filterConfig.priceField) {
            filtered.sort((a, b) => Number(a[filterConfig.priceField!]) - Number(b[filterConfig.priceField!]))
          }
          break
        case "price-high":
          if (filterConfig.priceField) {
            filtered.sort((a, b) => Number(b[filterConfig.priceField!]) - Number(a[filterConfig.priceField!]))
          }
          break
        case "budget-low":
          if (filterConfig.budgetField) {
            filtered.sort((a, b) => Number(a[filterConfig.budgetField!]) - Number(b[filterConfig.budgetField!]))
          }
          break
        case "budget-high":
          if (filterConfig.budgetField) {
            filtered.sort((a, b) => Number(b[filterConfig.budgetField!]) - Number(a[filterConfig.budgetField!]))
          }
          break
        case "rating":
          if (filterConfig.ratingField) {
            filtered.sort((a, b) => Number(b[filterConfig.ratingField!]) - Number(a[filterConfig.ratingField!]))
          }
          break
        case "deadline":
          if (filterConfig.dateField) {
            filtered.sort(
              (a, b) => new Date(a[filterConfig.dateField!]).getTime() - new Date(b[filterConfig.dateField!]).getTime(),
            )
          }
          break
        case "newest":
          if (filterConfig.dateField) {
            filtered.sort(
              (a, b) => new Date(b[filterConfig.dateField!]).getTime() - new Date(a[filterConfig.dateField!]).getTime(),
            )
          }
          break
        default:
          // Keep original order for 'popular' or other cases
          break
      }

      return filtered
    },
    [debouncedSearchQuery, filters],
  )

  // Memoized filter state for performance
  const filterState = useMemo(
    () => ({
      ...filters,
      debouncedSearchQuery,
    }),
    [filters, debouncedSearchQuery],
  )

  return {
    filters: filterState,
    updateFilter,
    updateSearchQuery,
    updateGame,
    updateRank,
    updatePriceRange,
    updateBudgetRange,
    updateSortBy,
    updateStatusFilter,
    updateTypeFilter,
    updateMinRating,
    toggleFilters,
    resetFilters,
    filterItems,
    // Helper getters
    hasActiveFilters: useMemo(
      () =>
        debouncedSearchQuery.trim() !== "" ||
        filters.selectedGame !== "Tümü" ||
        (filters.selectedRank && filters.selectedRank !== "Tümü") ||
        filters.priceRange[0] !== 0 ||
        filters.priceRange[1] !== priceMax ||
        (filters.budgetRange && (filters.budgetRange[0] !== 0 || filters.budgetRange[1] !== budgetMax)) ||
        (filters.statusFilter && filters.statusFilter !== "all") ||
        (filters.typeFilter && filters.typeFilter !== "all") ||
        (filters.minRating && filters.minRating > 0),
      [debouncedSearchQuery, filters, priceMax, budgetMax],
    ),

    // Options for components
    options: {
      games,
      ranks,
      sortOptions,
      priceMax,
      budgetMax,
    },
  }
}
