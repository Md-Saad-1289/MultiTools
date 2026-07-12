/* Search JS - Handles live searching and filtering of tools on the homepage */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('tool-search');
  const toolCards = document.querySelectorAll('.tool-card-item');
  const categorySections = document.querySelectorAll('.category-section');
  const noResults = document.getElementById('no-results-message');
  const popularSection = document.getElementById('popular-tools-section');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let matchCount = 0;

      // Handle search filtering
      toolCards.forEach(card => {
        const titleElement = card.querySelector('.tool-card-title');
        const descElement = card.querySelector('.tool-card-desc');
        const title = titleElement.textContent.toLowerCase();
        const desc = descElement.textContent.toLowerCase();

        if (title.includes(query) || desc.includes(query)) {
          card.style.display = 'flex';
          matchCount++;

          // Highlight matching substrings
          if (query.length > 0) {
            highlightElement(titleElement, query);
            highlightElement(descElement, query);
          } else {
            resetElementHighlight(titleElement);
            resetElementHighlight(descElement);
          }
        } else {
          card.style.display = 'none';
          resetElementHighlight(titleElement);
          resetElementHighlight(descElement);
        }
      });

      // Toggle Category Sections visibility
      categorySections.forEach(section => {
        const visibleCards = section.querySelectorAll('.tool-card-item[style="display: flex;"]');
        if (visibleCards.length === 0 && query !== '') {
          section.style.display = 'none';
        } else {
          section.style.display = 'block';
        }
      });

      // Toggle popular tools section during search to avoid confusion
      if (popularSection) {
        if (query !== '') {
          popularSection.style.display = 'none';
        } else {
          popularSection.style.display = 'block';
        }
      }

      // Show/Hide "No Results" Message
      if (noResults) {
        if (matchCount === 0 && query !== '') {
          noResults.style.display = 'block';
        } else {
          noResults.style.display = 'none';
        }
      }
    });
  }

  // Helper to highlight terms
  function highlightElement(element, query) {
    const text = element.textContent;
    // Store original text on first highlight to ensure we can reset accurately
    if (!element.dataset.originalText) {
      element.dataset.originalText = text;
    }
    const originalText = element.dataset.originalText;
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    element.innerHTML = originalText.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  // Helper to reset highlights
  function resetElementHighlight(element) {
    if (element.dataset.originalText) {
      element.innerHTML = element.dataset.originalText;
      delete element.dataset.originalText;
    }
  }

  // Escape special regex characters
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
});
