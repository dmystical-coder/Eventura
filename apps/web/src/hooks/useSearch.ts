import { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from 'use-debounce';

type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  price: number;
  category: string;
  popularity: number;
};

type SearchFilters = {
  location: string;
  startDate: string | null;
  endDate: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  categories: string[];
};

type SortOption = 'relevance' | 'date' | 'price' | 'popularity';

const RECENT_SEARCHES_KEY = 'recentSearches';
const MAX_RECENT_SEARCHES = 5;

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Event[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    startDate: null,
    endDate: null,
    minPrice: null,
    maxPrice: null,
    categories: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (savedSearches) {
      try {
        const parsedSearches = JSON.parse(savedSearches);
        setRecentSearches(Array.isArray(parsedSearches) ? parsedSearches : []);
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  const addToRecentSearches = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setRecentSearches(prev => {
      const updated = [searchTerm, ...prev.filter(term => term !== searchTerm)];
      return updated.slice(0, MAX_RECENT_SEARCHES);
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  }, []);

  // Mock search function - replace with actual API call
  const searchEvents = useCallback(async (searchQuery: string, searchFilters: SearchFilters, sortOption: SortOption) => {
    setIsLoading(true);
    setShowNoResults(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data - replace with actual API call
      const mockResults: Event[] = [];
      
      // Apply filters and sorting to mock results
      let filteredResults = [...mockResults];
      
      if (searchQuery) {
        filteredResults = filteredResults.filter(event => 
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (searchFilters.location) {
        filteredResults = filteredResults.filter(event =>
          event.location.toLowerCase().includes(searchFilters.location.toLowerCase())
        );
      }
      
      if (searchFilters.categories.length > 0) {
        filteredResults = filteredResults.filter(event =>
          searchFilters.categories.includes(event.category)
        );
      }
      
      // Apply sorting
      filteredResults.sort((a, b) => {
        switch (sortOption) {
          case 'date':
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case 'price':
            return a.price - b.price;
          case 'popularity':
            return b.popularity - a.popularity;
          case 'relevance':
          default:
            return 0; // Would be more sophisticated in a real implementation
        }
      });
      
      setResults(filteredResults);
      setShowNoResults(filteredResults.length === 0);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update suggestions based on query
  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions(recentSearches);
      return;
    }
    
    // In a real app, you might fetch these from an API
    const popularSuggestions = [
      'Concert',
      'Theater',
      'Workshop',
      'Conference',
      'Exhibition'
    ];
    
    const matchedSuggestions = [
      ...recentSearches.filter(term => 
        term.toLowerCase().includes(debouncedQuery.toLowerCase())
      ),
      ...popularSuggestions.filter(term => 
        term.toLowerCase().includes(debouncedQuery.toLowerCase()) && 
        !recentSearches.includes(term)
      )
    ];
    
    setSuggestions(Array.from(new Set(matchedSuggestions)).slice(0, 5));
  }, [debouncedQuery, recentSearches]);

  // Perform search when query or filters change
  useEffect(() => {
    if (debouncedQuery || Object.values(filters).some(Boolean)) {
      searchEvents(debouncedQuery, filters, sortBy);
    } else {
      setResults([]);
      setShowNoResults(false);
    }
  }, [debouncedQuery, filters, sortBy, searchEvents]);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery);
    }
  }, [addToRecentSearches]);

  const updateFilter = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  return {
    query,
    setQuery: handleSearch,
    suggestions,
    isLoading,
    results,
    showNoResults,
    filters,
    updateFilter,
    sortBy,
    setSortBy,
    recentSearches,
    clearRecentSearches
  };
};
