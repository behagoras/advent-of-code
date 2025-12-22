import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer, 
        AlignmentType, HeadingLevel, BorderStyle, WidthType, LevelFormat, ShadingType, 
        PageNumber, PageBreak } from 'docx';
import fs from 'fs';

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };
const headerShading = { fill: "1E3A5F", type: ShadingType.CLEAR };
const altRowShading = { fill: "F5F5F5", type: ShadingType.CLEAR };

function createCell(text, opts = {}) {
  const { bold, header, width, shading, align } = opts;
  return new TableCell({
    borders: cellBorders,
    width: { size: width || 4680, type: WidthType.DXA },
    shading: shading || (header ? headerShading : undefined),
    children: [new Paragraph({ 
      alignment: align || AlignmentType.LEFT,
      children: [new TextRun({ text, bold: bold || header, color: header ? "FFFFFF" : "000000", size: 20 })]
    })]
  });
}

function createTableRow(cells, isHeader = false) {
  return new TableRow({
    tableHeader: isHeader,
    children: cells.map((c, i) => createCell(c.text || c, { ...c, header: isHeader, width: c.width }))
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "1E3A5F", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "1E3A5F", font: "Arial" },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: "2E5A8F", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, color: "3E7ABF", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "checklist", levels: [{ level: 0, format: LevelFormat.BULLET, text: "☐", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullet-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-1", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ 
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Crucero MSC Seaside • 18-27 Dic 2025", size: 18, color: "666666", italics: true })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Página ", size: 18 }), new TextRun({ children: [PageNumber.CURRENT], size: 18 }), new TextRun({ text: " de ", size: 18 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18 })]
      })] })
    },
    children: [
      // TÍTULO
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("🚢 Guía Completa: Crucero MSC Seaside")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: "David + Noemi (Mamá) • 18-27 de Diciembre 2025", size: 24, color: "666666" })] }),

      // RESUMEN EJECUTIVO
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("📋 RESUMEN EJECUTIVO")] }),
      new Table({
        columnWidths: [3500, 5860],
        rows: [
          createTableRow([{ text: "Dato", width: 3500 }, { text: "Detalle", width: 5860 }], true),
          new TableRow({ children: [createCell("Viajeros", { bold: true, width: 3500 }), createCell("David Behar + Noemi (mamá)", { width: 5860 })] }),
          new TableRow({ children: [createCell("Crucero", { bold: true, width: 3500 }), createCell("MSC Seaside, Cabina 13200 (Balcony), Deck 13", { width: 5860 })] }),
          new TableRow({ children: [createCell("Booking", { bold: true, width: 3500 }), createCell("68575744", { width: 5860 })] }),
          new TableRow({ children: [createCell("Assembly Station", { bold: true, width: 3500 }), createCell("H", { width: 5860 })] }),
          new TableRow({ children: [createCell("Ruta", { bold: true, width: 3500 }), createCell("Miami → Nassau → Ocean Cay → Puerto Plata → Miami", { width: 5860 })] }),
          new TableRow({ children: [createCell("Check-in Crucero", { bold: true, width: 3500 }), createCell("19 dic, 12:00-13:00 • Terminal AA, 2200 N Cruise Blvd", { width: 5860 })] }),
        ]
      }),

      // VUELOS
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("✈️ Vuelos")] }),
      new Table({
        columnWidths: [2340, 3510, 3510],
        rows: [
          createTableRow([{ text: "Vuelo", width: 2340 }, { text: "Ida (18 dic)", width: 3510 }, { text: "Regreso (27 dic)", width: 3510 }], true),
          new TableRow({ children: [createCell("Aerolínea", { bold: true, width: 2340 }), createCell("Volaris Y4 790", { width: 3510 }), createCell("Volaris Y4 791", { width: 3510 })] }),
          new TableRow({ children: [createCell("Salida", { bold: true, width: 2340 }), createCell("MEX 10:05", { width: 3510 }), createCell("MIA 16:01", { width: 3510 })] }),
          new TableRow({ children: [createCell("Llegada", { bold: true, width: 2340 }), createCell("MIA 14:10", { width: 3510 }), createCell("MEX 18:45", { width: 3510 })] }),
        ]
      }),

      // HOSPEDAJE
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("🏨 Hospedaje")] }),
      new Table({
        columnWidths: [3120, 3120, 3120],
        rows: [
          createTableRow([{ text: "Fecha", width: 3120 }, { text: "Lugar", width: 3120 }, { text: "Dirección", width: 3120 }], true),
          new TableRow({ children: [createCell("18-19 dic", { bold: true, width: 3120 }), createCell("Airbnb Whitelaw Hotel", { width: 3120 }), createCell("808 Collins Ave, Miami Beach", { width: 3120 })] }),
          new TableRow({ children: [createCell("19-26 dic", { bold: true, width: 3120 }), createCell("MSC Seaside", { width: 3120 }), createCell("Cabina 13200, Deck 13", { width: 3120 })] }),
          new TableRow({ children: [createCell("26-27 dic", { bold: true, width: 3120 }), createCell("Hotel Shelley", { width: 3120 }), createCell("844 Collins Ave (Resort Fee ~$30)", { width: 3120 })] }),
        ]
      }),

      // PAGE BREAK - ITINERARIO
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("📅 ITINERARIO DETALLADO")] }),

      // DÍA 17 - MIÉRCOLES
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("MIÉRCOLES 17 DIC — Día antes del viaje")] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("09:30-17:30", { width: 2000 }), createCell("DevFest Ciudad de México 2025", { width: 7360 })] }),
          new TableRow({ children: [createCell("16:30", { width: 2000 }), createCell("Lucky va con Carlos (veterinario) — tu mamá lo lleva", { width: 7360 })] }),
          new TableRow({ children: [createCell("19:00-21:00", { width: 2000 }), createCell("Juegos de mesa (opcional, salir temprano)", { width: 7360 })] }),
          new TableRow({ children: [createCell("22:00", { width: 2000 }), createCell("⚠️ DORMIR TEMPRANO — Vuelo mañana", { width: 7360 })] }),
        ]
      }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "⚠️ Despertar: 5:00-5:30am • Salir de casa: 6:00am", bold: true, color: "CC0000", size: 20 })] }),

      // DÍA 18 - JUEVES
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("JUEVES 18 DIC — Llegada a Miami")] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("06:00", { width: 2000 }), createCell("Salida de casa", { width: 7360 })] }),
          new TableRow({ children: [createCell("07:00", { width: 2000 }), createCell("Check-in aeropuerto", { width: 7360 })] }),
          new TableRow({ children: [createCell("10:05", { width: 2000 }), createCell("✈️ Vuelo MEX → MIA (Volaris Y4 790)", { width: 7360 })] }),
          new TableRow({ children: [createCell("14:10", { width: 2000 }), createCell("Llegada a Miami", { width: 7360 })] }),
          new TableRow({ children: [createCell("~15:15", { width: 2000 }), createCell("Sales del aeropuerto (migración + equipaje)", { width: 7360 })] }),
          new TableRow({ children: [createCell("~15:45", { width: 2000 }), createCell("Uber al Airbnb (~30 min, ~$30 USD)", { width: 7360 })] }),
          new TableRow({ children: [createCell("16:00", { width: 2000 }), createCell("Check-in Airbnb — 808 Collins Ave", { width: 7360 })] }),
          new TableRow({ children: [createCell("16:00-21:00", { width: 2000 }), createCell("Pasear Ocean Drive + Target/Walgreens (browsing)", { width: 7360 })] }),
          new TableRow({ children: [createCell("21:00+", { width: 2000 }), createCell("Cena tarde — Big Pink o similar (~$20-25 pp)", { width: 7360 })] }),
          new TableRow({ children: [createCell("23:00", { width: 2000 }), createCell("Dormir", { width: 7360 })] }),
        ]
      }),

      // DÍA 19 - VIERNES
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("VIERNES 19 DIC — Embarque al Crucero")] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("08:00", { width: 2000 }), createCell("Desayuno (Denny's o similar, ~$25)", { width: 7360 })] }),
          new TableRow({ children: [createCell("10:30", { width: 2000 }), createCell("Terminar maletas, revisar carry-on", { width: 7360 })] }),
          new TableRow({ children: [createCell("11:00", { width: 2000 }), createCell("Check-out Airbnb", { width: 7360 })] }),
          new TableRow({ children: [createCell("11:15", { width: 2000 }), createCell("Uber al puerto (~23 min, ~$25 USD)", { width: 7360 })] }),
          new TableRow({ children: [createCell("11:45", { width: 2000 }), createCell("Llegar a Cruise Terminal AA", { width: 7360 })] }),
          new TableRow({ children: [createCell("12:00-13:00", { width: 2000 }), createCell("⚠️ VENTANA DE CHECK-IN (no llegar después)", { width: 7360 })] }),
          new TableRow({ children: [createCell("13:00-17:00", { width: 2000 }), createCell("Explorar barco, activar Cruise Card, alberca", { width: 7360 })] }),
          new TableRow({ children: [createCell("15:00", { width: 2000 }), createCell("⚠️ BOARDING CIERRA", { width: 7360 })] }),
          new TableRow({ children: [createCell("17:00", { width: 2000 }), createCell("🚢 ZARPA EL CRUCERO — Sail Away Party!", { width: 7360 })] }),
          new TableRow({ children: [createCell("Tarde/Noche", { width: 2000 }), createCell("Maletas llegan a cabina, cenar, show", { width: 7360 })] }),
        ]
      }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "⚠️ CRÍTICO: Maletas documentadas llegan tarde. Llevar en carry-on: pasaportes, Concerta, ropa del día, traje de baño, cargadores.", bold: true, color: "CC0000", size: 20 })] }),

      // DÍA 20 - SÁBADO
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("SÁBADO 20 DIC — Día en el Mar")] }),
      new Paragraph({ children: [new TextRun("Día completo navegando. Perfecto para explorar el barco, gimnasio, albercas, registrar cruise card.")] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("08:00", { width: 2000 }), createCell("Gimnasio (MSC Gym by Technogym, Deck 8)", { width: 7360 })] }),
          new TableRow({ children: [createCell("10:00", { width: 2000 }), createCell("Desayuno buffet (Marketplace, Deck 8)", { width: 7360 })] }),
          new TableRow({ children: [createCell("11:00-18:00", { width: 2000 }), createCell("Explorar barco, albercas, actividades", { width: 7360 })] }),
          new TableRow({ children: [createCell("Cena", { width: 2000 }), createCell("Restaurante principal (Seashore o Ipanema)", { width: 7360 })] }),
          new TableRow({ children: [createCell("Noche", { width: 2000 }), createCell("Show en teatro, The Garage (karaoke)", { width: 7360 })] }),
        ]
      }),

      // DÍA 21 - DOMINGO
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("DOMINGO 21 DIC — Nassau, Bahamas ⚓")] }),
      new Paragraph({ children: [new TextRun({ text: "En puerto: 08:00 - 18:00 (10 horas)", bold: true })] }),
      new Paragraph({ children: [new TextRun("Plan: Medio día explorando (4-5 hrs), regresar temprano.")] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("08:00", { width: 2000 }), createCell("Gimnasio rápido o desayuno", { width: 7360 })] }),
          new TableRow({ children: [createCell("09:30", { width: 2000 }), createCell("Bajar a Nassau", { width: 7360 })] }),
          new TableRow({ children: [createCell("10:00", { width: 2000 }), createCell("Straw Market (souvenirs, artesanías)", { width: 7360 })] }),
          new TableRow({ children: [createCell("11:00", { width: 2000 }), createCell("John Watling's Distillery (ron gratis, 15 min caminando)", { width: 7360 })] }),
          new TableRow({ children: [createCell("12:30", { width: 2000 }), createCell("Almuerzo local (conch fritters ~$15-25)", { width: 7360 })] }),
          new TableRow({ children: [createCell("13:30", { width: 2000 }), createCell("Junkanoo Beach (playa gratis, 5 min del puerto)", { width: 7360 })] }),
          new TableRow({ children: [createCell("15:00", { width: 2000 }), createCell("Regresar al barco", { width: 7360 })] }),
          new TableRow({ children: [createCell("15:00-18:00", { width: 2000 }), createCell("Barco casi vacío — albercas sin filas", { width: 7360 })] }),
        ]
      }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "💡 Tip: Guardar energía para Ocean Cay mañana (12 horas, el mejor día).", italics: true, size: 20 })] }),

      // DÍA 22 - LUNES
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("LUNES 22 DIC — Ocean Cay, MSC Marine Reserve 🏝️")] }),
      new Paragraph({ children: [new TextRun({ text: "En puerto: 08:00 - 20:00 (12 horas) — DÍA MÁS LARGO", bold: true, color: "008800" })] }),
      new Paragraph({ children: [new TextRun("Isla privada de MSC. Playas vírgenes, aguas cristalinas. Plan: día relajado de playa.")] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("08:00", { width: 2000 }), createCell("Desayuno temprano en el barco", { width: 7360 })] }),
          new TableRow({ children: [createCell("09:00", { width: 2000 }), createCell("Bajar a la isla", { width: 7360 })] }),
          new TableRow({ children: [createCell("09:00-12:00", { width: 2000 }), createCell("Playa + nadar (llevar bloqueador)", { width: 7360 })] }),
          new TableRow({ children: [createCell("12:00-14:00", { width: 2000 }), createCell("Almuerzo en food court (INCLUIDO)", { width: 7360 })] }),
          new TableRow({ children: [createCell("14:00-18:00", { width: 2000 }), createCell("Más playa, caminar, bares de playa", { width: 7360 })] }),
          new TableRow({ children: [createCell("18:00-19:30", { width: 2000 }), createCell("Atardecer en la isla (muy bonito)", { width: 7360 })] }),
          new TableRow({ children: [createCell("19:30", { width: 2000 }), createCell("Regresar al barco", { width: 7360 })] }),
        ]
      }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "⭐ HIGHLIGHT DEL CRUCERO — Maximizar este día.", bold: true, color: "008800", size: 20 })] }),

      // DÍA 23 - MARTES
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("MARTES 23 DIC — Día en el Mar")] }),
      new Paragraph({ children: [new TextRun("Navegando. Buen día para: spa, shows, compras duty-free, preparar outfit de Gala Night.")] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("08:00", { width: 2000 }), createCell("Gimnasio", { width: 7360 })] }),
          new TableRow({ children: [createCell("10:00", { width: 2000 }), createCell("Desayuno", { width: 7360 })] }),
          new TableRow({ children: [createCell("Día", { width: 2000 }), createCell("Actividades del barco, trivia, clases de baile", { width: 7360 })] }),
          new TableRow({ children: [createCell("Noche", { width: 2000 }), createCell("Posible GALA NIGHT — outfit formal", { width: 7360 })] }),
        ]
      }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "👔 Gala Night: Pantalón oscuro + camisa de botones + zapatos cerrados. NO jeans, shorts, sandalias, playeras.", italics: true, size: 20 })] }),

      // DÍA 24 - MIÉRCOLES
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("MIÉRCOLES 24 DIC — Puerto Plata + NOCHEBUENA 🎄")] }),
      new Paragraph({ children: [new TextRun({ text: "En puerto: 09:00 - 18:00 • DECISIÓN: Quedarse en el barco", bold: true })] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("08:00", { width: 2000 }), createCell("Gimnasio", { width: 7360 })] }),
          new TableRow({ children: [createCell("10:00", { width: 2000 }), createCell("Desayuno tranquilo", { width: 7360 })] }),
          new TableRow({ children: [createCell("11:00-17:00", { width: 2000 }), createCell("Día relajado en el barco (casi vacío)", { width: 7360 })] }),
          new TableRow({ children: [createCell("Tarde", { width: 2000 }), createCell("Actividades navideñas a bordo", { width: 7360 })] }),
          new TableRow({ children: [createCell("Noche", { width: 2000 }), createCell("🎄 CENA DE NOCHEBUENA (especial)", { width: 7360 })] }),
          new TableRow({ children: [createCell("23:00", { width: 2000 }), createCell("Villancicos + posible misa de medianoche", { width: 7360 })] }),
        ]
      }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "💡 MSC es italiana — Nochebuena es el día grande (cena especial de pescado). Quedarse en el barco es la mejor opción.", italics: true, size: 20 })] }),

      // DÍA 25 - JUEVES
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("JUEVES 25 DIC — NAVIDAD en el Mar 🎄")] }),
      new Paragraph({ children: [new TextRun("Día navegando con programación especial navideña.")] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("Mañana", { width: 2000 }), createCell("Desayuno, gimnasio opcional", { width: 7360 })] }),
          new TableRow({ children: [createCell("Día", { width: 2000 }), createCell("Actividades navideñas: Christmas Karaoke, quizzes", { width: 7360 })] }),
          new TableRow({ children: [createCell("Tarde", { width: 2000 }), createCell("MSC Christmas Show en teatro", { width: 7360 })] }),
          new TableRow({ children: [createCell("Noche", { width: 2000 }), createCell("Cena de Navidad, shows especiales", { width: 7360 })] }),
        ]
      }),

      // PAGE BREAK
      new Paragraph({ children: [new PageBreak()] }),

      // DÍA 26 - VIERNES
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("VIERNES 26 DIC — Regreso a Miami + SAWGRASS MILLS")] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("07:00", { width: 2000 }), createCell("🚢 Barco llega a Miami", { width: 7360 })] }),
          new TableRow({ children: [createCell("08:00", { width: 2000 }), createCell("Desayuno a bordo", { width: 7360 })] }),
          new TableRow({ children: [createCell("09:00-10:00", { width: 2000 }), createCell("Desembarque", { width: 7360 })] }),
          new TableRow({ children: [createCell("10:15", { width: 2000 }), createCell("Uber a Hotel Shelley (~$30) — dejar maletas", { width: 7360 })] }),
          new TableRow({ children: [createCell("10:45", { width: 2000 }), createCell("Uber a Sawgrass Mills (~45-60 min)", { width: 7360 })] }),
          new TableRow({ children: [createCell("11:30-15:30", { width: 2000 }), createCell("🛍️ SHOPPING: Best Buy, Marshalls, TJ Maxx, Target", { width: 7360 })] }),
          new TableRow({ children: [createCell("16:00", { width: 2000 }), createCell("Uber de regreso (~45-60 min)", { width: 7360 })] }),
          new TableRow({ children: [createCell("17:00", { width: 2000 }), createCell("Check-in Hotel Shelley — 844 Collins Ave", { width: 7360 })] }),
          new TableRow({ children: [createCell("18:00", { width: 2000 }), createCell("Descansar, bañarse", { width: 7360 })] }),
          new TableRow({ children: [createCell("20:00", { width: 2000 }), createCell("🍽️ CENA DE CIERRE — Big Pink o Puerto Sagua", { width: 7360 })] }),
        ]
      }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "⚠️ Resort Fee Hotel Shelley: ~$30 USD adicionales a pagar en el hotel.", italics: true, size: 20 })] }),

      // DÍA 27 - SÁBADO
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("SÁBADO 27 DIC — Regreso a México")] }),
      new Table({
        columnWidths: [2000, 7360],
        rows: [
          createTableRow([{ text: "Hora", width: 2000 }, { text: "Actividad", width: 7360 }], true),
          new TableRow({ children: [createCell("08:00-10:00", { width: 2000 }), createCell("Desayuno y caminata final", { width: 7360 })] }),
          new TableRow({ children: [createCell("11:00", { width: 2000 }), createCell("Check-out Hotel Shelley", { width: 7360 })] }),
          new TableRow({ children: [createCell("11:00-12:30", { width: 2000 }), createCell("Últimas horas en Miami (opcional)", { width: 7360 })] }),
          new TableRow({ children: [createCell("12:30", { width: 2000 }), createCell("Uber al aeropuerto (~30 min, ~$35)", { width: 7360 })] }),
          new TableRow({ children: [createCell("13:00", { width: 2000 }), createCell("Llegar a MIA, check-in", { width: 7360 })] }),
          new TableRow({ children: [createCell("16:01", { width: 2000 }), createCell("✈️ Vuelo MIA → MEX (Volaris Y4 791)", { width: 7360 })] }),
          new TableRow({ children: [createCell("18:45", { width: 2000 }), createCell("Llegada a CDMX 🇲🇽", { width: 7360 })] }),
        ]
      }),

      // PAGE BREAK - PRESUPUESTO
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("💰 PRESUPUESTO ESTIMADO")] }),

      // Transportes
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Transportes (Uber)")] }),
      new Table({
        columnWidths: [6240, 3120],
        rows: [
          createTableRow([{ text: "Concepto", width: 6240 }, { text: "Costo", width: 3120 }], true),
          new TableRow({ children: [createCell("MIA Aeropuerto → Airbnb", { width: 6240 }), createCell("$30 USD", { width: 3120 })] }),
          new TableRow({ children: [createCell("Airbnb → Puerto crucero", { width: 6240 }), createCell("$25 USD", { width: 3120 })] }),
          new TableRow({ children: [createCell("Puerto → Hotel Shelley", { width: 6240 }), createCell("$30 USD", { width: 3120 })] }),
          new TableRow({ children: [createCell("Hotel → Sawgrass Mills (ida)", { width: 6240 }), createCell("~$45 USD", { width: 3120 })] }),
          new TableRow({ children: [createCell("Sawgrass Mills → Hotel (vuelta)", { width: 6240 }), createCell("~$45 USD", { width: 3120 })] }),
          new TableRow({ children: [createCell("Hotel → MIA Aeropuerto", { width: 6240 }), createCell("$35 USD", { width: 3120 })] }),
          new TableRow({ children: [createCell("SUBTOTAL TRANSPORTE", { bold: true, width: 6240 }), createCell("~$210 USD", { bold: true, width: 3120 })] }),
        ]
      }),

      // Comidas
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Comidas (solo Miami, crucero incluido)")] }),
      new Table({
        columnWidths: [4680, 2340, 2340],
        rows: [
          createTableRow([{ text: "Comida", width: 4680 }, { text: "Lugar", width: 2340 }, { text: "Costo", width: 2340 }], true),
          new TableRow({ children: [createCell("Cena 18 dic", { width: 4680 }), createCell("Big Pink", { width: 2340 }), createCell("$50 USD", { width: 2340 })] }),
          new TableRow({ children: [createCell("Desayuno 19 dic", { width: 4680 }), createCell("Denny's", { width: 2340 }), createCell("$25 USD", { width: 2340 })] }),
          new TableRow({ children: [createCell("Almuerzo Nassau 21 dic", { width: 4680 }), createCell("Local", { width: 2340 }), createCell("$30 USD", { width: 2340 })] }),
          new TableRow({ children: [createCell("Desayuno 26 dic", { width: 4680 }), createCell("En barco", { width: 2340 }), createCell("$0", { width: 2340 })] }),
          new TableRow({ children: [createCell("Almuerzo 26 dic", { width: 4680 }), createCell("Sawgrass", { width: 2340 }), createCell("$35 USD", { width: 2340 })] }),
          new TableRow({ children: [createCell("Cena cierre 26 dic", { width: 4680 }), createCell("Big Pink/Puerto Sagua", { width: 2340 }), createCell("$60 USD", { width: 2340 })] }),
          new TableRow({ children: [createCell("Desayuno 27 dic", { width: 4680 }), createCell("Denny's/café", { width: 2340 }), createCell("$25 USD", { width: 2340 })] }),
          new TableRow({ children: [createCell("SUBTOTAL COMIDAS", { bold: true, width: 4680 }), createCell("", { width: 2340 }), createCell("~$225 USD", { bold: true, width: 2340 })] }),
        ]
      }),

      // Extras
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Extras")] }),
      new Table({
        columnWidths: [6240, 3120],
        rows: [
          createTableRow([{ text: "Concepto", width: 6240 }, { text: "Costo", width: 3120 }], true),
          new TableRow({ children: [createCell("Propinas en tierra", { width: 6240 }), createCell("$50 USD", { width: 3120 })] }),
          new TableRow({ children: [createCell("Resort Fee Hotel Shelley", { width: 6240 }), createCell("~$30 USD", { width: 3120 })] }),
          new TableRow({ children: [createCell("Emergencias/varios", { width: 6240 }), createCell("$50 USD", { width: 3120 })] }),
          new TableRow({ children: [createCell("SUBTOTAL EXTRAS", { bold: true, width: 6240 }), createCell("~$130 USD", { bold: true, width: 3120 })] }),
        ]
      }),

      // Total
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("TOTAL")] }),
      new Table({
        columnWidths: [6240, 3120],
        rows: [
          createTableRow([{ text: "Concepto", width: 6240 }, { text: "Costo", width: 3120 }], true),
          new TableRow({ children: [createCell("TOTAL BASE (sin shopping)", { bold: true, width: 6240 }), createCell("~$565 USD", { bold: true, width: 3120 })] }),
          new TableRow({ children: [createCell("+ Shopping (iPad, ropa, regalos)", { width: 6240 }), createCell("TBD", { width: 3120 })] }),
        ]
      }),

      // PAGE BREAK - CHECKLISTS
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("✅ CHECKLISTS")] }),

      // ANTES DEL VIAJE
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("📋 Antes del viaje (15-17 dic)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("HOY 15 dic, 6pm — Doctor de alergias")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Pedir rutina de gimnasio al entrenador")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Avisar al banco que viajas a EEUU")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Coordinar entrevistas (no hay durante viaje)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("17 dic 4:30pm — Lucky va con Carlos (mamá lo lleva)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Descargar boarding passes Volaris (disponibles 16 dic)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Descargar app MSC for Me")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Descargar Google Maps offline de Miami")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Imprimir E-ticket crucero MSC")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Guardar confirmaciones Airbnb y Hotel Shelley")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("17 dic — DORMIR TEMPRANO (~22:00)")] }),

      // PARA EMPACAR
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("🧳 Para empacar")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Maleta documentada")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Ropa casual (shorts, playeras, bermudas)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("2-3 outfits smart casual para cenas")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("1 outfit formal para Gala Night (pantalón oscuro + camisa)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("2 trajes de baño")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Ropa deportiva (7 días de gym)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Tenis de gym")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Sandalias")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Sudadera/chamarra ligera (aire acondicionado)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Paraguas compacto")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("⚠️ Carry-on (CRÍTICO para día 19)")] }),
      new Paragraph({ children: [new TextRun({ text: "Las maletas documentadas llegan tarde a la cabina. Tu carry-on DEBE incluir:", color: "CC0000", bold: true })] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Pasaportes y documentos")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Concerta y medicamentos")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Ropa para 1 día completo (tarde/noche 19 dic)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Traje de baño (para alberca antes de que llegue maleta)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Electrónicos, cargadores, power bank")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Artículos de valor")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Mochila de día")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Botella reutilizable")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Bloqueador")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Lentes de sol + gorra")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Kindle")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("iPad")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Snacks empaquetados (permitidos)")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Electrónicos")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Computadora")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("iPad")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Celulares (2)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Cargadores todos")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Power bank")] }),

      // LISTA DE SHOPPING
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("🛍️ Lista de shopping (26 dic)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("iPad o tableta para entrevistas de System Design")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Cargador del celular para coche")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Jabón de baño íntimo")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Jabón para la cara")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Regalo para Jessica")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Power bank")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun("Ropa: camisa, pantalones de colores, suéteres, chamarras")] }),

      // PAGE BREAK - INFO CRUCERO
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("🚢 INFO DEL CRUCERO MSC SEASIDE")] }),

      // Restaurantes
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("🍽️ Restaurantes (incluidos con Bella)")] }),
      new Table({
        columnWidths: [3120, 2340, 3900],
        rows: [
          createTableRow([{ text: "Restaurante", width: 3120 }, { text: "Deck", width: 2340 }, { text: "Horario", width: 3900 }], true),
          new TableRow({ children: [createCell("Seashore Restaurant", { bold: true, width: 3120 }), createCell("Deck 5", { width: 2340 }), createCell("Desayuno, almuerzo (mar), cena", { width: 3900 })] }),
          new TableRow({ children: [createCell("Ipanema Restaurant", { bold: true, width: 3120 }), createCell("Deck 6", { width: 2340 }), createCell("Solo cena", { width: 3900 })] }),
          new TableRow({ children: [createCell("Marketplace Buffet", { bold: true, width: 3120 }), createCell("Deck 8", { width: 2340 }), createCell("6:30am - 2:00am", { width: 3900 })] }),
        ]
      }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Cena incluida todas las noches. Horario asignado con Bella (temprano 5:30-7:30 o tarde 7:45-9:45).", italics: true, size: 20 })] }),

      // Entretenimiento
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("🎭 Entretenimiento")] }),
      new Table({
        columnWidths: [3120, 2340, 3900],
        rows: [
          createTableRow([{ text: "Lugar", width: 3120 }, { text: "Deck", width: 2340 }, { text: "Qué hay", width: 3900 }], true),
          new TableRow({ children: [createCell("Metropolitan Theater", { bold: true, width: 3120 }), createCell("Deck 6-7", { width: 2340 }), createCell("Shows nocturnos (3 funciones)", { width: 3900 })] }),
          new TableRow({ children: [createCell("The Garage Club", { bold: true, width: 3120 }), createCell("Deck 7", { width: 2340 }), createCell("Karaoke, DJ, baile (hasta 4am)", { width: 3900 })] }),
          new TableRow({ children: [createCell("Atrium", { bold: true, width: 3120 }), createCell("Deck 5-8", { width: 2340 }), createCell("Música en vivo, eventos", { width: 3900 })] }),
          new TableRow({ children: [createCell("Casino", { bold: true, width: 3120 }), createCell("Deck 7", { width: 2340 }), createCell("Mesas y slots", { width: 3900 })] }),
        ]
      }),

      // Actividades navideñas
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("🎄 Actividades Navideñas")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("MSC Christmas Show — show especial en teatro")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Christmas Karaoke — canciones navideñas")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Villancicos en vivo")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Misa de medianoche (Nochebuena)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Cena especial de Nochebuena y Navidad")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Christmas Quiz y juegos")] }),

      // Gimnasio
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("🏋️ Gimnasio (MSC Gym by Technogym)")] }),
      new Paragraph({ children: [new TextRun({ text: "Ubicación: Deck 8 • Incluido en crucero • Abierto temprano", bold: true })] }),
      new Paragraph({ spacing: { before: 100 }, children: [new TextRun("Equipamiento disponible:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Máquinas Technogym: Chest Press, Lat Pulldown, Leg Press, etc.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Pesas libres: mancuernas hasta ~30kg, barra olímpica, rack")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Funcional: TRX, balones medicinales, bandas, saco de boxeo")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Cardio: cintas, bicicletas, elípticas, remadora")] }),

      // Información importante
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("⚠️ Información Importante")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Assembly Station: H — para simulacro de emergencia")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Propinas ya incluidas en booking (SC2526CN)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Activar Cruise Card apenas subir al barco")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("App MSC for Me funciona con WiFi del barco (sin paquete)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Gala Night: NO shorts, playeras, sandalias en restaurante principal")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Room service con Bella: $3.50 cargo por entrega")] }),

      // CONTACTOS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("📞 CONTACTOS Y DIRECCIONES")] }),
      new Table({
        columnWidths: [3120, 6240],
        rows: [
          createTableRow([{ text: "Lugar", width: 3120 }, { text: "Dirección / Info", width: 6240 }], true),
          new TableRow({ children: [createCell("Airbnb (18-19 dic)", { bold: true, width: 3120 }), createCell("808 Collins Ave, Miami Beach FL 33139", { width: 6240 })] }),
          new TableRow({ children: [createCell("Puerto crucero", { bold: true, width: 3120 }), createCell("Terminal AA, 2200 N Cruise Blvd, Miami FL 33132", { width: 6240 })] }),
          new TableRow({ children: [createCell("Hotel Shelley (26-27 dic)", { bold: true, width: 3120 }), createCell("844 Collins Ave, Miami Beach FL 33139", { width: 6240 })] }),
          new TableRow({ children: [createCell("Sawgrass Mills", { bold: true, width: 3120 }), createCell("12801 W Sunrise Blvd, Sunrise FL 33323", { width: 6240 })] }),
          new TableRow({ children: [createCell("Lucky (veterinario)", { bold: true, width: 3120 }), createCell("Carlos — recoge 17 dic 4:30pm", { width: 6240 })] }),
        ]
      }),

      // Final
      new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "¡Buen viaje! 🚢🎄", size: 28, bold: true, color: "1E3A5F" })] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(".//guia-crucero-msc-seaside.docx", buffer);
  console.log("✅ Documento Word creado: guia-crucero-msc-seaside.docx");
});


