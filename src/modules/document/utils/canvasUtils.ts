import * as fabric from 'fabric'

class FabricDrawing {
  private canvas: fabric.Canvas
  private drawingModeEl: HTMLElement
  private drawingOptionsEl: HTMLElement
  private drawingColorEl: HTMLInputElement
  private drawingShadowColorEl: HTMLInputElement
  private drawingLineWidthEl: HTMLInputElement
  private drawingShadowWidth: HTMLInputElement
  private drawingShadowOffset: HTMLInputElement
  private clearEl: HTMLElement

  constructor() {
    this.canvas = new fabric.Canvas('c', {
      isDrawingMode: true,
    })
    fabric.Object.prototype.transparentCorners = false

    this.drawingModeEl = this.getElementById('drawing-mode')
    this.drawingOptionsEl = this.getElementById('drawing-mode-options')
    this.drawingColorEl = this.getElementById(
      'drawing-color'
    ) as HTMLInputElement
    this.drawingShadowColorEl = this.getElementById(
      'drawing-shadow-color'
    ) as HTMLInputElement
    this.drawingLineWidthEl = this.getElementById(
      'drawing-line-width'
    ) as HTMLInputElement
    this.drawingShadowWidth = this.getElementById(
      'drawing-shadow-width'
    ) as HTMLInputElement
    this.drawingShadowOffset = this.getElementById(
      'drawing-shadow-offset'
    ) as HTMLInputElement
    this.clearEl = this.getElementById('clear-canvas')

    this.clearEl.onclick = () => {
      this.canvas.clear()
    }
    this.drawingModeEl.onclick = () => {
      this.toggleDrawingMode()
    }
    this.setupDrawingModeSelector()
    this.setupDrawingColorChangeListener()
    this.setupDrawingShadowColorChangeListener()
    this.setupDrawingLineWidthChangeListener()
    this.setupDrawingShadowWidthChangeListener()
    this.setupDrawingShadowOffsetChangeListener()
    this.setupCanvasBrush()
  }

  private getElementById(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement
  }

  private toggleDrawingMode() {
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode
    if (this.canvas.isDrawingMode) {
      this.drawingModeEl.innerHTML = 'Cancel drawing mode'
      this.drawingOptionsEl.style.display = ''
    } else {
      this.drawingModeEl.innerHTML = 'Enter drawing mode'
      this.drawingOptionsEl.style.display = 'none'
    }
  }

  private setupDrawingModeSelector() {
    const drawingModeSelector = document.getElementById(
      'drawing-mode-selector'
    ) as HTMLSelectElement
    drawingModeSelector.onchange = () => {
      this.setCanvasBrush()
    }
  }

  private setupDrawingColorChangeListener() {
    this.drawingColorEl.onchange = () => {
      this.setBrushColor()
    }
  }

  private setupDrawingShadowColorChangeListener() {
    this.drawingShadowColorEl.onchange = () => {
      this.setShadowColor()
    }
  }

  private setupDrawingLineWidthChangeListener() {
    this.drawingLineWidthEl.onchange = () => {
      this.setLineWidth()
    }
  }

  private setupDrawingShadowWidthChangeListener() {
    this.drawingShadowWidth.onchange = () => {
      this.setShadowWidth()
    }
  }

  private setupDrawingShadowOffsetChangeListener() {
    this.drawingShadowOffset.onchange = () => {
      this.setShadowOffset()
    }
  }

  private setupCanvasBrush() {
    this.setCanvasBrush()
  }

  private setCanvasBrush() {
    const drawingModeSelector = document.getElementById(
      'drawing-mode-selector'
    ) as HTMLSelectElement
    const selectedValue = drawingModeSelector.value
    let brush
    if (selectedValue === 'hline') {
      brush = new fabric.PatternBrush(this.canvas)
      // Implement getPatternSrc for hline
    } else {
      brush = new (fabric as any)[selectedValue + 'Brush'](this.canvas)
    }

    if (brush) {
      brush.color = this.drawingColorEl.value
      // Set other brush properties
    }

    this.canvas.freeDrawingBrush = brush
  }

  private setBrushColor() {
    const brush = this.canvas.freeDrawingBrush
    if (brush) {
      brush.color = this.drawingColorEl.value
      // Set other brush properties if needed
    }
  }

  private setShadowColor() {
    const brush = this.canvas.freeDrawingBrush
    if (brush && brush.shadow) {
      brush.shadow.color = this.drawingShadowColorEl.value
    }
  }

  private setLineWidth() {
    const brush = this.canvas.freeDrawingBrush
    if (brush) {
      brush.width = parseInt(this.drawingLineWidthEl.value, 10) || 1
      // Set other brush properties if needed
    }
  }

  private setShadowWidth() {
    const brush = this.canvas.freeDrawingBrush
    if (brush && brush.shadow) {
      brush.shadow.blur = parseInt(this.drawingShadowWidth.value, 10) || 0
    }
  }

  private setShadowOffset() {
    const brush = this.canvas.freeDrawingBrush
    if (brush && brush.shadow) {
      brush.shadow.offsetX = parseInt(this.drawingShadowOffset.value, 10) || 0
      brush.shadow.offsetY = parseInt(this.drawingShadowOffset.value, 10) || 0
    }
  }
}

new FabricDrawing()
