import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX, FiCalendar, FiMapPin, FiDollarSign, FiFilter, FiChevronDown, FiChevronUp, FiClock, FiStar } from 'react-icons/fi';
import { useSearch } from '../hooks/useSearch';
import styles from './SearchBar.module.css';

const CATEGORIES = [
  'Music', 'Sports', 'Arts', 'Business', 'Food & Drink',
  'Technology', 'Health', 'Fashion', 'Education', 'Other'
];

const SearchBar: React.FC = () => {
  const {
    query,
    setQuery,
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
  } = useSearch();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsSuggestionsOpen(true);
    setActiveSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsSuggestionsOpen(false);
    searchInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSuggestionsOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
          setQuery(suggestions[activeSuggestionIndex]);
          setIsSuggestionsOpen(false);
        }
        break;
      case 'Escape':
        setIsSuggestionsOpen(false);
        break;
    }
  };

  const handleClearFilters = () => {
    updateFilter({
      location: '',
      startDate: null,
      endDate: null,
      minPrice: null,
      maxPrice: null,
      categories: [],
    });
  };

  const toggleCategory = (category: string) => {
    updateFilter({
      categories: filters.categories.includes(category)
        ? filters.categories.filter(c => c !== category)
        : [...filters.categories, category]
    });
  };

  const renderSuggestions = () => {
    if (!isSuggestionsOpen || (!suggestions.length && !recentSearches.length)) return null;

    return (
      <div className={styles.suggestionsDropdown}>
        {suggestions.length > 0 && (
          <div className={styles.suggestionsSection}>
            <div className={styles.sectionHeader}>
              <FiSearch className={styles.sectionIcon} />
              <span>Suggestions</span>
            </div>
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion}
                className={`${styles.suggestionItem} ${index === activeSuggestionIndex ? styles.active : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        
        {recentSearches.length > 0 && (
          <div className={styles.suggestionsSection}>
            <div className={styles.sectionHeader}>
              <FiClock className={styles.sectionIcon} />
              <span>Recent Searches</span>
              <button 
                className={styles.clearButton}
                onClick={(e) => {
                  e.stopPropagation();
                  clearRecentSearches();
                }}
              >
                Clear all
              </button>
            </div>
            {recentSearches.map((search, index) => (
              <div
                key={search}
                className={`${styles.suggestionItem} ${suggestions.length + index === activeSuggestionIndex ? styles.active : ''}`}
                onClick={() => handleSuggestionClick(search)}
              >
                {search}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <div className={styles.searchBar}>
        <div className={styles.searchInputContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsSuggestionsOpen(true)}
            placeholder="Search for events..."
            className={styles.searchInput}
            aria-label="Search for events"
          />
          {query && (
            <button 
              className={styles.clearButton}
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}
          {isLoading && <div className={styles.loadingIndicator}>Searching...</div>}
        </div>
        
        <button 
          className={`${styles.filterToggle} ${isFiltersOpen ? styles.active : ''}`}
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          aria-expanded={isFiltersOpen}
          aria-controls="filters-panel"
        >
          <FiFilter />
          <span>Filters</span>
          {isFiltersOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        <button className={styles.searchButton} onClick={() => setQuery(query)}>
          Search
        </button>
      </div>

      {isSuggestionsOpen && renderSuggestions()}

      <div 
        id="filters-panel" 
        className={`${styles.filtersPanel} ${isFiltersOpen ? styles.open : ''}`}
      >
        <div className={styles.filterSection}>
          <h3 className={styles.filterSectionTitle}>
            <FiMapPin className={styles.filterIcon} />
            Location
          </h3>
          <div className={styles.filterInputGroup}>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => updateFilter({ location: e.target.value })}
              placeholder="City or venue"
              className={styles.filterInput}
            />
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.filterSectionTitle}>
            <FiCalendar className={styles.filterIcon} />
            Date Range
          </h3>
          <div className={styles.dateRangeInputs}>
            <div className={styles.dateInputGroup}>
              <label>From</label>
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => updateFilter({ startDate: e.target.value || null })}
                className={styles.filterInput}
              />
            </div>
            <div className={styles.dateInputGroup}>
              <label>To</label>
              <input
                type="date"
                value={filters.endDate || ''}
                min={filters.startDate || undefined}
                onChange={(e) => updateFilter({ endDate: e.target.value || null })}
                className={styles.filterInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.filterSectionTitle}>
            <FiDollarSign className={styles.filterIcon} />
            Price Range
          </h3>
          <div className={styles.rangeInputs}>
            <div className={styles.rangeInputGroup}>
              <label>Min ($)</label>
              <input
                type="number"
                min="0"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter({ minPrice: e.target.value ? Number(e.target.value) : null })}
                placeholder="Min"
                className={styles.rangeInput}
              />
            </div>
            <div className={styles.rangeInputGroup}>
              <label>Max ($)</label>
              <input
                type="number"
                min={filters.minPrice || 0}
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter({ maxPrice: e.target.value ? Number(e.target.value) : null })}
                placeholder="Max"
                className={styles.rangeInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.filterSectionTitle}>
            <FiStar className={styles.filterIcon} />
            Sort By
          </h3>
          <div className={styles.sortOptions}>
            {['relevance', 'date', 'price', 'popularity'].map((option) => (
              <button
                key={option}
                className={`${styles.sortOption} ${sortBy === option ? styles.active : ''}`}
                onClick={() => setSortBy(option as any)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.filterSectionTitle}>Categories</h3>
          <div className={styles.categoryTags}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`${styles.categoryTag} ${filters.categories.includes(category) ? styles.selected : ''}`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterActions}>
          <button 
            className={styles.clearFiltersButton}
            onClick={handleClearFilters}
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {showNoResults && (
        <div className={styles.noResults}>
          <h3>No events found</h3>
          <p>Try adjusting your search or filters to find more events.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className={styles.resultsGrid}>
          {results.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>${event.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;