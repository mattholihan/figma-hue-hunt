var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 240, height: 400, themeColors: true });
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: f(0), g: f(8), b: f(4) };
}
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'ADD_TO_PALETTE') {
        const { targetColorRGB, hex, hslString } = msg;
        yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
        yield figma.loadFontAsync({ family: "Inter", style: "Bold" });
        const frame = figma.createFrame();
        frame.name = "Color Swatch";
        frame.resize(200, 280);
        frame.cornerRadius = 12;
        frame.clipsContent = true;
        frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        frame.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
        frame.strokeWeight = 1;
        const colorRect = figma.createRectangle();
        colorRect.resize(200, 200);
        colorRect.x = 0;
        colorRect.y = 0;
        colorRect.fills = [{ type: 'SOLID', color: targetColorRGB }];
        frame.appendChild(colorRect);
        const hexText = figma.createText();
        hexText.characters = hex;
        hexText.fontName = { family: "Inter", style: "Bold" };
        hexText.fontSize = 16;
        hexText.x = 16;
        hexText.y = 216;
        frame.appendChild(hexText);
        const hslText = figma.createText();
        hslText.characters = hslString;
        hslText.fontName = { family: "Inter", style: "Regular" };
        hslText.fontSize = 12;
        hslText.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
        hslText.x = 16;
        hslText.y = 240;
        frame.appendChild(hslText);
        frame.x = figma.viewport.center.x - 100;
        frame.y = figma.viewport.center.y - 140;
        figma.currentPage.appendChild(frame);
        figma.currentPage.selection = [frame];
        figma.notify("Added to palette!");
    }
});
//# sourceMappingURL=code.js.map