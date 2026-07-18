/**
 * app.js - Voies d'Eau d'Europe
 *
 * Responsibilities:
 *   1. Tomes / documents configuration (edit here to add entries)
 *   2. Dynamic rendering of:
 *        • Navbar dropdown (grouped by Tome, with headers & dividers)
 *        • Document list in the #documents section (by Tome)
 *   3. PDF modal viewer
 *        • Loads the selected PDF into an <iframe>
 *        • Shows an optional citation block (e.g. Tome 6, Partie 3)
 *        • Clears the iframe on modal close (stops PDF rendering)
 *        • Provides a download fallback link
 *   4. Event bindings (delegated - works on dynamically-added elements)
 *
 * Dependencies (must be loaded before this script):
 *   jQuery 3.x → Popper.js 1.x → Bootstrap 4.x
 */

(function ($) {
  'use strict';

  /* ==============================================================
   * 1. TOMES & DOCUMENTS CONFIGURATION
   *
   * Each tome has:
   *   id        {string}   – unique slug
   *   label     {string}   – heading shown in the UI
   *   icon      {string}   – Font Awesome 5 class for the heading
   *   documents {Array}    – list of documents in that tome
   *
   * Each document has:
   *   id       {string}   – unique slug (used as data-doc-id)
   *   title    {string}   – human-readable name shown in the UI
   *   file     {string}   – URL or path to the PDF
   *   citation {string}   – (optional) note displayed in the modal
   *                         below the PDF viewer
   *
   * To add a new document: add an entry to the matching tome's
   * documents array (or create a new tome object). No HTML changes
   * are required.
   * ============================================================== */
  var tomes = [
    {
      id:    'tome-1',
      label: 'Tome 1 - Histoire',
      icon:  'fa-history',
      documents: [
        {
          id:    't1-histoire',
          title: 'Tome 1 - Histoire',
          file:  'pdf/tome1_-_Histoire.pdf'
        },
        {
          id:    't1-soliton',
          title: 'Annexe Tome 1 : Le Soliton',
          file:  'pdf/soliton.pdf'
        }
      ]
    },
    {
      id:    'tome-2',
      label: 'Tome 2 - Les écluses',
      icon:  'fa-lock',
      documents: [
        {
          id:    't2-ch1',
          title: 'Chapitre 1 - Écluses en bois',
          file:  'pdf/Tome2_Chapitre1_Les_ecluses_en_bois.pdf'
        },
        {
          id:    't2-ch2',
          title: 'Chapitre 2 - Forme des écluses',
          file:  'pdf/Tome2_Chapitre2_Forme_des_ecluses.pdf'
        },
        {
          id:    't2-ch3',
          title: 'Chapitre 3 - Tours de contrôle',
          file:  'pdf/Tome2_Chapitre3_Tours_de_controle.pdf'
        },
        {
          id:    't2-ch4',
          title: 'Chapitre 4 - Postes de travail',
          file:  'pdf/Tome2_Chapitre4_Les_postes_de_travail.pdf'
        },
        {
          id:    't2-ch5',
          title: 'Chapitre 5 - Matériaux de construction',
          file:  'pdf/Tome2_Chapitre5_Materiaux_de_construction_des_ecluses.pdf'
        },
        {
          id:    't2-ch6',
          title: 'Chapitre 6 - Disposition des écluses',
          file:  'pdf/Tome2_Chapitre6_Disposition_des_ecluses.pdf'
        },
        {
          id:    't2-ch7',
          title: 'Chapitre 7 - Échelles d\'écluses',
          file:  'pdf/Tome2_Chapitre7_echelles_d_ecluse.pdf'
        },
        {
          id:    't2-ch8',
          title: 'Chapitre 8 - Bassin d\'épargne',
          file:  'pdf/Tome2_Chapitre8_bassin_d_epargne.pdf'
        },
        {
          id:    't2-ch10',
          title: 'Chapitre 10 - Les moulins',
          file:  'pdf/Tome2_Chapitre10_Moulins.pdf'
        },
        {
          id:    't2-ch11',
          title: 'Chapitre 11 - Vapeur',
          file:  'pdf/Tome2_Chapitre11_Vapeur.pdf'
        },
        {
          id:    't2-ch12',
          title: 'Chapitre 12 - Les portes',
          file:  'pdf/Tome2_Chapitre12_Les_portes.pdf'
        }
      ]
    },
    {
      id:    'tome-3',
      label: 'Tome 3',
      icon:  'fa-book',
      documents: [
        {
          id:    't3-p1',
          title: 'Tome 3 - Partie 1',
          file:  'pdf/Tome3_Partie1.pdf'
        },
        {
          id:    't3-p2',
          title: 'Tome 3 - Partie 2',
          file:  'pdf/Tome3_Partie2.pdf'
        },
        {
          id:    't3-p3',
          title: 'Tome 3 - Partie 3',
          file:  'pdf/Tome3_Partie3.pdf'
        },
        {
          id:    't3-p4',
          title: 'Tome 3 - Partie 4',
          file:  'pdf/Tome3_Partie4.pdf'
        }
      ]
    },
    {
      id:    'tome-4',
      label: 'Tome 4',
      icon:  'fa-book',
      documents: [
        {
          id:    't4-p1',
          title: 'Tome 4 - Partie 1',
          file:  'pdf/Tome-4-partie-1.pdf'
        },
        {
          id:    't4-p2',
          title: 'Tome 4 - Partie 2',
          file:  'pdf/Tome-4-partie-2.pdf'
        },
        {
          id:    't4-p3',
          title: 'Tome 4 - Partie 3',
          file:  'pdf/Tome-4-partie-3.pdf'
        },
        {
          id:    't4-p4',
          title: 'Tome 4 - Partie 4',
          file:  'pdf/Tome-4-partie-4.pdf'
        }
      ]
    },
    {
      id:    'tome-5',
      label: 'Tome 5',
      icon:  'fa-book',
      documents: [
        {
          id:    't5-p1',
          title: 'Tome 5 - Partie 1',
          file:  'pdf/Tome-5-partie-1.pdf'
        },
        {
          id:    't5-p2',
          title: 'Tome 5 - Partie 2',
          file:  'pdf/Tome-5-partie-2.pdf'
        },
        {
          id:    't5-p3',
          title: 'Tome 5 - Partie 3',
          file:  'pdf/Tome-5-partie-3.pdf'
        },
        {
          id:    't5-p4',
          title: 'Tome 5 - Partie 4',
          file:  'pdf/Tome-5-partie-4.pdf'
        }
      ]
    },
    {
      id:    'tome-6',
      label: 'Tome 6',
      icon:  'fa-book',
      documents: [
        {
          id:    't6-p1',
          title: 'Tome 6 - Partie 1',
          file:  'pdf/Tome-6-partie-1.pdf'
        },
        {
          id:    't6-p2',
          title: 'Tome 6 - Partie 2',
          file:  'pdf/Tome-6-partie-2.pdf'
        },
        {
          id:    't6-p3',
          title: 'Tome 6 - Partie 3',
          file:  'pdf/Tome-6-partie-3.pdf',
          /*
           * This document carries a closing note from the editor.
           * It is displayed in the modal below the PDF viewer.
           */
          citation: 'Fin du tome\u00a06 :\n\n' +
            'Le tome\u00a06 a \u00e9t\u00e9 termin\u00e9 le 21 aout 2010, date \u00e0 laquelle ' +
            'Jacques de La Garde nous a quitt\u00e9s, terrass\u00e9 par un arr\u00eat ' +
            'cardiaque dans sa 88\u00e8me ann\u00e9e. La table onomastique n\u2019a pas ' +
            '\u00e9t\u00e9 faite, ni l\u2019index des photos ou textes emprunt\u00e9s.\n' +
            'Cela se fera, mais il me faut du temps.\n\n' +
            'Anna Marie Perrichon'
        }
      ]
    }
  ];


  /* ==============================================================
   * INTERNAL: flat lookup map built from the tomes array
   * Used by getDocById() for O(1) access.
   * ============================================================== */
  var documentById = {};
  $.each(tomes, function (i, tome) {
    $.each(tome.documents, function (j, doc) {
      documentById[doc.id] = doc;
    });
  });


  /* ==============================================================
   * 2. DYNAMIC MENU & DOCUMENT LIST RENDERING
   * ============================================================== */

  /**
   * Build the navbar dropdown and the documents section from
   * the tomes[] array. Called once on DOM ready.
   */
  function buildDocumentUI() {
    var $dropdown = $('#documents-dropdown-menu');
    var $list     = $('#documents-list');

    $.each(tomes, function (tomeIndex, tome) {

      /* ---- Navbar: Tome header + document links ---- */
      if (tomeIndex > 0) {
        $dropdown.append('<div class="dropdown-divider"></div>');
      }
      $dropdown.append(
        '<h6 class="dropdown-header">' + escapeHtml(tome.label) + '</h6>'
      );
      $.each(tome.documents, function (i, doc) {
        $dropdown.append(
          $('<a>', {
            'class':       'dropdown-item',
            'href':        '#',
            'data-doc-id': doc.id,
            'text':        doc.title
          })
        );
      });

      /* ---- Documents section: Tome card with list-group ---- */
      var listItems = '';
      $.each(tome.documents, function (i, doc) {
        listItems += [
          '<li class="list-group-item d-flex justify-content-between',
          '          align-items-center py-2">',
          '  <span>' + escapeHtml(doc.title) + '</span>',
          '  <button class="btn btn-primary btn-sm flex-shrink-0 ml-3"',
          '          data-doc-id="' + escapeHtml(doc.id) + '"',
          '          aria-label="Consulter\u00a0: ' + escapeHtml(doc.title) + '">',
          '    <i class="fas fa-eye mr-1" aria-hidden="true"></i>',
          '    Consulter',
          '  </button>',
          '</li>'
        ].join('\n');
      });

      var tomeCard = [
        '<div class="tome-section mb-4">',
        '  <h3 class="tome-heading">',
        '    <i class="fas ' + escapeHtml(tome.icon) + ' mr-2" aria-hidden="true"></i>',
        '    ' + escapeHtml(tome.label),
        '  </h3>',
        '  <ul class="list-group list-group-flush border rounded shadow-sm">',
        listItems,
        '  </ul>',
        '</div>'
      ].join('\n');

      $list.append(tomeCard);
    });
  }


  /* ==============================================================
   * 3. PDF MODAL VIEWER
   * ============================================================== */

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  }

  function getPdfViewerUrl(fileUrl) {
    return fileUrl + '#view=FitH';
  }

  function openPdfInNewTab(fileUrl) {
    var newWindow = window.open(fileUrl, '_blank', 'noopener');
    if (newWindow) {
      newWindow.opener = null;
      return true;
    }
    return false;
  }

  function showPdfFallbackMessage(doc, downloadLabel) {
    var $pdfContainer = $('.pdf-container');
    var $iframe = $('#pdf-viewer');

    $iframe.hide().attr('src', '');
    $pdfContainer.find('.pdf-loading-spinner, .pdf-error-message').remove();

    var $errorMessage = $('<div class="pdf-error-message"></div>');
    $errorMessage.append(
      $('<p class="mb-3"></p>').text('L’aperçu intégré du PDF n’est pas disponible dans ce navigateur. Vous pouvez ouvrir le document dans un nouvel onglet ou le télécharger directement.')
    );
    $errorMessage.append(
      $('<div class="d-flex flex-column flex-sm-row justify-content-center align-items-center"></div>')
        .append(
          $('<a class="btn btn-light mb-2 mb-sm-0 mr-sm-2"></a>')
            .attr('href', doc.file)
            .attr('target', '_blank')
            .attr('rel', 'noopener noreferrer')
            .text('Ouvrir dans un nouvel onglet')
        )
        .append(
          $('<a class="btn btn-outline-light"></a>')
            .attr('href', doc.file)
            .attr('download', '')
            .attr('aria-label', downloadLabel)
            .text(downloadLabel)
        )
    );
    $pdfContainer.append($errorMessage);
  }

  /**
   * Open the PDF viewer modal for the given document id.
   * If the document has a citation property, display it below the viewer.
   * @param {string} docId – matches a tomes[].documents[].id value
   */
  function openPdfModal(docId) {
    var doc = getDocById(docId);
    if (!doc) {
      console.warn('[VDE] No document found for id:', docId);
      return;
    }

    /* Update modal title */
    $('#pdfModalLabel').text(doc.title);

    /* Update download/open links */
    var downloadLabel = 'Télécharger\u00a0- ' + doc.title;
    $('#pdf-download-link')
      .attr('href', doc.file)
      .attr('aria-label', downloadLabel);
    $('#pdf-open-link')
      .attr('href', doc.file)
      .attr('aria-label', 'Ouvrir dans un nouvel onglet\u00a0- ' + doc.title);
    $('#pdf-fallback-link')
      .attr('href', doc.file)
      .text(doc.title);

    /* Show or hide the citation block */
    var $citationBlock = $('#pdf-citation-block');
    var $citationText  = $('#pdf-citation-text');
    if (doc.citation) {
      /* Render newlines as <br> elements safely */
      var lines = doc.citation.split('\n');
      $citationText.empty();
      $.each(lines, function (i, line) {
        if (i > 0) { $citationText.append($('<br>')); }
        $citationText.append(document.createTextNode(line));
      });
      $citationBlock.removeClass('d-none');
    } else {
      $citationBlock.addClass('d-none');
      $citationText.empty();
    }

    var $pdfContainer = $('.pdf-container');
    var $iframe = $('#pdf-viewer');

    $pdfContainer.find('.pdf-loading-spinner, .pdf-error-message').remove();
    $iframe.show().off('.pdfViewer').attr('src', 'about:blank');

    if (isMobileDevice()) {
      if (!openPdfInNewTab(doc.file)) {
        showPdfFallbackMessage(doc, downloadLabel);
        $('#pdfModal').modal('show');
      }
      return;
    }

    /* Open the Bootstrap 4 modal before attaching the PDF */
    $('#pdfModal').modal('show');

    /* Afficher spinner de chargement avant le chargement du PDF */
    var $spinner = $('<div class="pdf-loading-spinner d-flex align-items-center justify-content-center">' +
      '<div class="spinner-border text-light" role="status">' +
      '<span class="sr-only">Chargement du document\u2026</span></div></div>');
    $pdfContainer.append($spinner);

    var viewerUrl = getPdfViewerUrl(doc.file);
    var fallbackTimer = window.setTimeout(function () {
      $spinner.remove();
      showPdfFallbackMessage(doc, downloadLabel);
    }, 8000);

    $iframe.one('load.pdfViewer', function () {
      window.clearTimeout(fallbackTimer);
      $spinner.remove();
    });

    /* iframe error events are unreliable for PDFs, but keep a handler just in case */
    $iframe.one('error.pdfViewer', function () {
      window.clearTimeout(fallbackTimer);
      $spinner.remove();
      showPdfFallbackMessage(doc, downloadLabel);
    });

    /* Set iframe source - this triggers PDF loading */
    $iframe.attr('src', viewerUrl);
  }

  /**
   * Return the document object matching the given id, or null.
   * @param  {string} id
   * @returns {Object|null}
   */
  function getDocById(id) {
    return documentById[id] || null;
  }


  /* ==============================================================
   * 4. EVENT BINDINGS
   * ============================================================== */
  function bindEvents() {
    /*
     * Delegated click handler on any element carrying [data-doc-id].
     * Works for navbar dropdown items, list-group buttons, etc.,
     * even though they are injected after page load.
     */
    $(document).on('click', '[data-doc-id]', function (e) {
      e.preventDefault();
      openPdfModal($(this).data('doc-id'));
    });

    /*
     * When the modal closes, clear the iframe src.
     * This stops the PDF from rendering in the background and
     * frees browser memory.
     */
    $('#pdfModal').on('hidden.bs.modal', function () {
      $('.pdf-container').find('.pdf-loading-spinner, .pdf-error-message').remove();
      $('#pdf-viewer').show().attr('src', 'about:blank').off('.pdfViewer');
    });
  }


  /* ==============================================================
   * 5. UTILITY HELPERS
   * ============================================================== */

  /**
   * Safely escape a string for insertion into HTML.
   * Uses jQuery's own text-node mechanism to prevent XSS.
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
