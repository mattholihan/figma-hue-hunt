figma.showUI(__html__, { width: 240, height: 400, themeColors: true });

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: f(0), g: f(8), b: f(4) };
}

figma.ui.onmessage = async msg => {
  if (msg.type === 'CREATE_TROPHY') {
    const { targetHSL, userHSL, score } = msg;

    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });

    const frame = figma.createFrame();
    frame.name = `Match Trophy: ${score}%`;
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "AUTO";
    frame.itemSpacing = 16;
    frame.paddingTop = 24;
    frame.paddingBottom = 24;
    frame.paddingLeft = 24;
    frame.paddingRight = 24;
    frame.cornerRadius = 16;
    frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    frame.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
    frame.strokeWeight = 1;

    // Title
    const title = figma.createText();
    title.characters = `Match Score: ${score}%`;
    title.fontName = { family: "Inter", style: "Bold" };
    title.fontSize = 24;
    frame.appendChild(title);

    // Date
    const dateText = figma.createText();
    dateText.characters = new Date().toLocaleDateString();
    dateText.fontName = { family: "Inter", style: "Regular" };
    dateText.fontSize = 14;
    dateText.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
    frame.appendChild(dateText);

    // Colors Row
    const colorsFrame = figma.createFrame();
    colorsFrame.layoutMode = "HORIZONTAL";
    colorsFrame.itemSpacing = 16;
    colorsFrame.primaryAxisSizingMode = "AUTO";
    colorsFrame.counterAxisSizingMode = "AUTO";
    colorsFrame.fills = [];
    frame.appendChild(colorsFrame);

    const targetColorRGB = hslToRgb(targetHSL.h, targetHSL.s, targetHSL.l);
    const targetRect = figma.createRectangle();
    targetRect.resize(100, 100);
    targetRect.cornerRadius = 8;
    targetRect.fills = [{ type: 'SOLID', color: targetColorRGB }];
    colorsFrame.appendChild(targetRect);

    const userColorRGB = hslToRgb(userHSL.h, userHSL.s, userHSL.l);
    const userRect = figma.createRectangle();
    userRect.resize(100, 100);
    userRect.cornerRadius = 8;
    userRect.fills = [{ type: 'SOLID', color: userColorRGB }];
    colorsFrame.appendChild(userRect);

    // Labels Row
    const labelsFrame = figma.createFrame();
    labelsFrame.layoutMode = "HORIZONTAL";
    labelsFrame.itemSpacing = 16;
    labelsFrame.primaryAxisSizingMode = "AUTO";
    labelsFrame.counterAxisSizingMode = "AUTO";
    labelsFrame.fills = [];
    frame.appendChild(labelsFrame);

    const targetLabel = figma.createText();
    targetLabel.characters = `Target\n${targetHSL.h}°, ${targetHSL.s}%, ${targetHSL.l}%`;
    targetLabel.fontName = { family: "Inter", style: "Regular" };
    targetLabel.fontSize = 12;
    targetLabel.textAlignHorizontal = "CENTER";
    targetLabel.resize(100, targetLabel.height);
    labelsFrame.appendChild(targetLabel);

    const userLabel = figma.createText();
    userLabel.characters = `Your Guess\n${userHSL.h}°, ${userHSL.s}%, ${userHSL.l}%`;
    userLabel.fontName = { family: "Inter", style: "Regular" };
    userLabel.fontSize = 12;
    userLabel.textAlignHorizontal = "CENTER";
    userLabel.resize(100, userLabel.height);
    labelsFrame.appendChild(userLabel);

    figma.currentPage.appendChild(frame);
    figma.viewport.scrollAndZoomIntoView([frame]);

    figma.notify(`Trophy placed! You scored ${score}%`);
  }
};
