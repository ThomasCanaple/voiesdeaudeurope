/**
 * app.js — Voies d'Eau d'Europe
 *
 * Responsibilities:
 *   1. Menu-to-PDF mapping configuration  (edit here to add documents)
 *   2. Dynamic rendering of:
 *        • Navbar dropdown links
 *        • Document cards in the #documents section
 *   3. PDF modal viewer
 *        • Loads the selected PDF into an <iframe>
 *        • Clears the iframe on modal close (stops PDF rendering)
 *        • Provides a download fallback link
 *   4. Event bindings (delegated — works on dynamically-added elements)
 *
 * Dependencies (must be loaded before this script):
 *   jQuery 3.x → Popper.js 1.x → Bootstrap 4.x
 */

(function ($) {
  'use strict';

  /* ==============================================================
   * 1. MENU-TO-PDF CONFIGURATION
   *
   * Add, remove, or reorder entries here to update the entire
   * site without touching any HTML.
   *
   * Each entry accepts:
   *   id    {string} – Unique slug used as a data attribute key.
   *   title {string} – Human-readable name shown in the UI.
   *   desc  {string} – Short description displayed on the card.
   *   file  {string} – Path to the PDF relative to index.html.
   *   icon  {string} – Font Awesome 5 class (optional, defaults to
   *                    'fa-file-pdf').
   * ============================================================== */
  var documents = [
    {
      id:    'carte-du-reseau',
      title: 'Carte du Réseau',
      desc:  'Carte complète du réseau des voies navigables ' +
             'intérieures européennes.',
      file:  'pdf/carte-du-reseau.pdf',
      icon:  'fa-map'
    },
    {
      id:    'guide-navigation',
      title: 'Guide de Navigation',
      desc:  'Guide pratique à destination des navigateurs sur ' +
             'les voies d\'eau intérieures.',
      file:  'pdf/guide-navigation.pdf',
      icon:  'fa-compass'
    },
    {
      id:    'reglementation',
      title: 'Réglementation Fluviale',
      desc:  'Textes réglementaires applicables à la navigation ' +
             'fluviale en Europe.',
      file:  'pdf/reglementation.pdf',
      icon:  'fa-gavel'
    },
    {
      id:    'horaires-ecluses',
      title: 'Horaires des Écluses',
      desc:  'Calendrier d\'ouverture et horaires détaillés des ' +
             'écluses sur le réseau européen.',
      file:  'pdf/horaires-ecluses.pdf',
      icon:  'fa-clock'
    }
  ];


  /* ==============================================================
   * 2. DYNAMIC MENU & CARD RENDERING
   *
   * Builds both the navbar dropdown and the document card grid
   * from the documents[] array above.
   * ============================================================== */

  /**
   * Build the navbar dropdown links and the document cards.
   * Called once on DOM ready.
   */
  function buildDocumentUI() {
    var $dropdown = $('#documents-dropdown-menu');
    var $cards    = $('#documents-cards');

    $.each(documents, function (index, doc) {

      /* ---- Navbar dropdown entry ---- */
      $dropdown.append(
        $('<a>', {
          'class':        'dropdown-item',
          'href':         '#',
          'data-doc-id':  doc.id,
          'text':         doc.title
        })
      );

      /* ---- Document card ---- */
      var iconClass = doc.icon || 'fa-file-pdf';
      var card = [
        '<div class="col-sm-6 col-lg-3 mb-4" role="listitem">',
        '  <div class="card h-100 shadow-sm document-card">',
        '    <div class="card-body d-flex flex-column">',
        '      <div class="card-icon mb-3" aria-hidden="true">',
        '        <i class="fas ' + escapeHtml(iconClass) + ' fa-2x text-primary"></i>',
        '      </div>',
        '      <h5 class="card-title">' + escapeHtml(doc.title) + '</h5>',
        '      <p class="card-text text-muted flex-grow-1">' + escapeHtml(doc.desc) + '</p>',
        '      <button class="btn btn-primary btn-sm mt-3"',
        '              data-doc-id="' + escapeHtml(doc.id) + '"',
        '              aria-label="Consulter : ' + escapeHtml(doc.title) + '">',
        '        <i class="fas fa-eye mr-1" aria-hidden="true"></i> Consulter',
        '      </button>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n');

      $cards.append(card);
    });
  }


  /* ==============================================================
   * 3. PDF MODAL VIEWER
   *
   * Finds the document by id, updates the modal title, loads the
   * PDF into the iframe, and opens the Bootstrap modal.
   * ============================================================== */

  /**
   * Open the PDF viewer modal for the given document id.
   * @param {string} docId – matches a documents[].id value
   */
  function openPdfModal(docId) {
    var doc = getDocById(docId);
    if (!doc) {
      console.warn('[VDE] No document found for id:', docId);
      return;
    }

    /* Update modal title */
    $('#pdfModalLabel').text(doc.title);

    /* Set iframe source — this triggers PDF loading */
    $('#pdf-viewer').attr('src', doc.file);

    /* Update both download links */
    var downloadLabel = 'Télécharger — ' + doc.title;
    $('#pdf-download-link')
      .attr('href', doc.file)
      .attr('aria-label', downloadLabel);
    $('#pdf-fallback-link')
      .attr('href', doc.file)
      .text(doc.title);

    /* Open the Bootstrap 4 modal */
    $('#pdfModal').modal('show');
  }

  /**
   * Return the document object matching the given id, or null.
   * @param  {string} id
   * @returns {Object|null}
   */
  function getDocById(id) {
    return $.grep(documents, function (doc) {
      return doc.id === id;
    })[0] || null;
  }


  /* ==============================================================
   * 4. EVENT BINDINGS
   * ============================================================== */
  function bindEvents() {
    /*
     * Delegated click handler on any element carrying [data-doc-id].
     * Works for both the navbar dropdown items and the card buttons,
     * even though they are injected after page load.
     */
    $(document).on('click', '[data-doc-id]', function (e) {
      e.preventDefault();
      openPdfModal($(this).data('doc-id'));
    });

    /*
     * When the modal closes, clear the iframe src.
     * This stops the PDF from continuing to render / stream in the
     * background and frees browser memory.
     */
    $('#pdfModal').on('hidden.bs.modal', function () {
      $('#pdf-viewer').attr('src', '');
    });
  }


  /* ==============================================================
   * 5. UTILITY HELPERS
   * ============================================================== */

  /**
   * Safely escape a string for insertion into HTML.
   * Uses jQuery's own text-node mechanism to avoid XSS.
   * @param  {string} str
   * @returns {string} HTML-escaped string
   */
  function escapeHtml(str) {
    return $('<div>').text(String(str)).html();
  }


  /* ==============================================================
   * 6. INITIALISATION
   * ============================================================== */
  $(function () {
    buildDocumentUI();
    bindEvents();
  });

}(jQuery));
