var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 320, height: 520, themeColors: false });
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: f(0), g: f(8), b: f(4) };
}
/**
 * Determines if text should be white or black over a given color.
 * Uses relative luminance to decide.
 */
function contrastTextColor(rgb) {
    const luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
    return luminance < 0.5
        ? { r: 1, g: 1, b: 1 } // white text
        : { r: 0, g: 0, b: 0 }; // black text
}
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'ADD_TO_PALETTE') {
        const { targetColorRGB, hex, hslString, userColorRGB, userHex, userHslString, score } = msg;
        yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
        yield figma.loadFontAsync({ family: "Inter", style: "Bold" });
        yield figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
        // ── Main Frame ──
        const frame = figma.createFrame();
        frame.name = `Hue Hunt — ${score}% Match`;
        frame.resize(320, 440);
        frame.cornerRadius = 16;
        frame.clipsContent = true;
        frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        // ── Target Color Block (top ~55%) ──
        const targetRect = figma.createRectangle();
        targetRect.name = "Target Color";
        targetRect.resize(320, 240);
        targetRect.x = 0;
        targetRect.y = 0;
        targetRect.fills = [{ type: 'SOLID', color: targetColorRGB }];
        frame.appendChild(targetRect);
        // Target label
        const targetLabel = figma.createText();
        targetLabel.characters = "TARGET";
        targetLabel.fontName = { family: "Inter", style: "Semi Bold" };
        targetLabel.fontSize = 10;
        targetLabel.letterSpacing = { value: 3, unit: "PIXELS" };
        const targetTextColor = contrastTextColor(targetColorRGB);
        targetLabel.fills = [{ type: 'SOLID', color: targetTextColor, opacity: 0.6 }];
        targetLabel.x = 20;
        targetLabel.y = 16;
        frame.appendChild(targetLabel);
        // Target HEX
        const hexText = figma.createText();
        hexText.characters = hex;
        hexText.fontName = { family: "Inter", style: "Bold" };
        hexText.fontSize = 28;
        hexText.fills = [{ type: 'SOLID', color: targetTextColor }];
        hexText.x = 20;
        hexText.y = 190;
        frame.appendChild(hexText);
        // Target HSL
        const hslText = figma.createText();
        hslText.characters = hslString;
        hslText.fontName = { family: "Inter", style: "Regular" };
        hslText.fontSize = 12;
        hslText.fills = [{ type: 'SOLID', color: targetTextColor, opacity: 0.7 }];
        hslText.x = 20;
        hslText.y = 220;
        frame.appendChild(hslText);
        // ── User Color Block (bottom ~30%) ──
        const userRect = figma.createRectangle();
        userRect.name = "Your Guess";
        userRect.resize(320, 140);
        userRect.x = 0;
        userRect.y = 240;
        userRect.fills = [{ type: 'SOLID', color: userColorRGB }];
        frame.appendChild(userRect);
        // User label
        const userLabel = figma.createText();
        userLabel.characters = "YOUR GUESS";
        userLabel.fontName = { family: "Inter", style: "Semi Bold" };
        userLabel.fontSize = 10;
        userLabel.letterSpacing = { value: 3, unit: "PIXELS" };
        const userTextColor = contrastTextColor(userColorRGB);
        userLabel.fills = [{ type: 'SOLID', color: userTextColor, opacity: 0.6 }];
        userLabel.x = 20;
        userLabel.y = 252;
        frame.appendChild(userLabel);
        // User HEX
        const userHexText = figma.createText();
        userHexText.characters = userHex;
        userHexText.fontName = { family: "Inter", style: "Bold" };
        userHexText.fontSize = 20;
        userHexText.fills = [{ type: 'SOLID', color: userTextColor }];
        userHexText.x = 20;
        userHexText.y = 268;
        frame.appendChild(userHexText);
        // User HSL
        const userHslText = figma.createText();
        userHslText.characters = userHslString;
        userHslText.fontName = { family: "Inter", style: "Regular" };
        userHslText.fontSize = 11;
        userHslText.fills = [{ type: 'SOLID', color: userTextColor, opacity: 0.7 }];
        userHslText.x = 20;
        userHslText.y = 292;
        frame.appendChild(userHslText);
        // ── Score Footer ──
        const footerRect = figma.createRectangle();
        footerRect.name = "Score Footer";
        footerRect.resize(320, 60);
        footerRect.x = 0;
        footerRect.y = 380;
        footerRect.fills = [{ type: 'SOLID', color: { r: 0.07, g: 0.07, b: 0.07 } }];
        frame.appendChild(footerRect);
        const scoreText = figma.createText();
        scoreText.characters = `${score}% MATCH`;
        scoreText.fontName = { family: "Inter", style: "Bold" };
        scoreText.fontSize = 18;
        scoreText.letterSpacing = { value: 2, unit: "PIXELS" };
        scoreText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        scoreText.x = 20;
        scoreText.y = 398;
        frame.appendChild(scoreText);
        // ── Position on canvas ──
        frame.x = figma.viewport.center.x - 160;
        frame.y = figma.viewport.center.y - 220;
        figma.currentPage.appendChild(frame);
        figma.currentPage.selection = [frame];
        figma.notify(`🎨 ${score}% match swatch added!`);
    }
});
//# sourceMappingURL=code.js.map