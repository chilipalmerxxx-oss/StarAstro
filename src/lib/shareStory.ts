// Renders the "ciel du jour" as a 1080×1920 story image and hands it to the
// native share sheet (Instagram, WhatsApp…), or downloads it as a fallback.
// The image is built to live outside the app: no UI chrome, readable as a
// thumbnail, a discreet signature and a tracked link back.

export interface StoryContent {
  dateLabel: string;
  mood: string;
  mission?: { text: string; done: boolean };
  oui: string[];
  non: string[];
}

export type ShareOutcome = 'shared' | 'downloaded' | 'cancelled';

const WIDTH = 1080;
const HEIGHT = 1920;
const MARGIN = 96;
const SERIF = "'Cormorant Garamond', Georgia, serif";
const GOLD = '#d9b866';
const INK = '#f4ecdc';
const MUTED = 'rgba(244, 236, 220, 0.6)';

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });

const wrapLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const drawLines = (
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
) => {
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
};

const drawLabel = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, align: CanvasTextAlign = 'center') => {
  ctx.save();
  ctx.font = `500 30px ${SERIF}`;
  ctx.fillStyle = GOLD;
  ctx.textAlign = align;
  ctx.letterSpacing = '6px';
  ctx.fillText(text.toLocaleUpperCase('fr-FR'), x, y);
  ctx.restore();
};

const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  const points = [[0, -1], [0.24, -0.24], [1, 0], [0.24, 0.24], [0, 1], [-0.24, 0.24], [-1, 0], [-0.24, -0.24]];
  points.forEach(([px, py], index) => {
    const method = index === 0 ? 'moveTo' : 'lineTo';
    ctx[method](x + px * size, y + py * size);
  });
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

const renderStory = async (content: StoryContent) => {
  await Promise.all([
    document.fonts?.load(`400 90px ${SERIF}`),
    document.fonts?.load(`500 30px ${SERIF}`),
    document.fonts?.load(`italic 400 34px ${SERIF}`),
  ]).catch(() => undefined);

  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas indisponible');

  // Sky: night gradient, the lunar dawn fading in from the top, a few stars.
  const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  sky.addColorStop(0, '#15121a');
  sky.addColorStop(0.5, '#0b0a11');
  sky.addColorStop(1, '#07070b');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const moon = await loadImage('/costar-lunar-dawn-v1.png');
  if (moon) {
    const scale = WIDTH / moon.width;
    ctx.save();
    ctx.globalAlpha = 0.62;
    ctx.drawImage(moon, 0, 0, WIDTH, moon.height * scale);
    ctx.restore();
    const fade = ctx.createLinearGradient(0, 0, 0, 980);
    fade.addColorStop(0, 'rgba(11, 10, 17, 0.1)');
    fade.addColorStop(0.45, 'rgba(11, 10, 17, 0.75)');
    fade.addColorStop(1, '#0b0a11');
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, WIDTH, 980);
    ctx.fillStyle = '#0b0a11';
    ctx.fillRect(0, 980, WIDTH, HEIGHT - 980);
    ctx.fillStyle = sky;
    ctx.globalAlpha = 0.6;
    ctx.fillRect(0, 980, WIDTH, HEIGHT - 980);
    ctx.globalAlpha = 1;
  }

  for (let i = 0; i < 70; i++) {
    const x = (i * 397) % WIDTH;
    const y = 700 + ((i * 631) % (HEIGHT - 700));
    ctx.fillStyle = `rgba(255, 245, 225, ${0.15 + ((i * 7) % 10) / 25})`;
    ctx.beginPath();
    ctx.arc(x, y, i % 9 === 0 ? 2.2 : 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.textBaseline = 'alphabetic';
  const center = WIDTH / 2;
  const textWidth = WIDTH - MARGIN * 2;

  // Header.
  drawLabel(ctx, 'Night One', center, 170);
  ctx.font = `italic 400 38px ${SERIF}`;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'center';
  ctx.fillText(content.dateLabel, center, 230);

  // Energy of the day.
  let y = 520;
  drawLabel(ctx, 'Énergie du jour', center, y);
  ctx.font = `400 88px ${SERIF}`;
  ctx.fillStyle = INK;
  y = drawLines(ctx, wrapLines(ctx, content.mood, textWidth), center, y + 120, 98);

  // Challenge card.
  if (content.mission) {
    y += 60;
    drawLabel(ctx, 'Défi du jour', center, y);
    y += 50;
    ctx.font = `400 50px ${SERIF}`;
    const missionLines = wrapLines(ctx, content.mission.text, textWidth - 150);
    const cardHeight = 80 + missionLines.length * 62;
    ctx.save();
    ctx.fillStyle = 'rgba(22, 20, 28, 0.88)';
    ctx.strokeStyle = content.mission.done ? 'rgba(241, 216, 143, 0.75)' : 'rgba(201, 168, 76, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(MARGIN, y, textWidth, cardHeight, 36);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const boxX = MARGIN + 70;
    const boxY = y + 70;
    ctx.beginPath();
    ctx.arc(boxX, boxY, 26, 0, Math.PI * 2);
    if (content.mission.done) {
      ctx.fillStyle = '#e3c271';
      ctx.fill();
      ctx.strokeStyle = '#1b1408';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(boxX - 11, boxY + 1);
      ctx.lineTo(boxX - 3, boxY + 9);
      ctx.lineTo(boxX + 12, boxY - 8);
      ctx.stroke();
    } else {
      ctx.strokeStyle = 'rgba(240, 214, 150, 0.7)';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    ctx.font = `400 50px ${SERIF}`;
    ctx.fillStyle = content.mission.done ? '#f1dca4' : INK;
    ctx.textAlign = 'left';
    drawLines(ctx, missionLines, MARGIN + 130, y + 86, 62);
    y += cardHeight;
  }

  // Yes / No.
  if (content.oui.length || content.non.length) {
    y += 110;
    const columnLeft = MARGIN + 20;
    const columnRight = center + 40;
    ctx.textAlign = 'left';
    ctx.save();
    ctx.font = `500 32px ${SERIF}`;
    ctx.letterSpacing = '8px';
    ctx.fillStyle = GOLD;
    ctx.fillText('OUI', columnLeft, y);
    ctx.fillStyle = '#d0835a';
    ctx.fillText('NON', columnRight, y);
    ctx.restore();
    ctx.font = `400 46px ${SERIF}`;
    ctx.fillStyle = INK;
    const rows = Math.max(content.oui.length, content.non.length);
    for (let row = 0; row < rows; row++) {
      const rowY = y + 80 + row * 70;
      if (content.oui[row]) ctx.fillText(content.oui[row], columnLeft, rowY, center - columnLeft - 40);
      if (content.non[row]) ctx.fillText(content.non[row], columnRight, rowY, WIDTH - MARGIN - columnRight);
    }
    ctx.strokeStyle = 'rgba(240, 214, 150, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(center, y - 30);
    ctx.lineTo(center, y + 60 + rows * 70);
    ctx.stroke();
  }

  // Signature.
  drawStar(ctx, center, HEIGHT - 250, 16, GOLD);
  ctx.textAlign = 'center';
  ctx.font = `italic 400 36px ${SERIF}`;
  ctx.fillStyle = MUTED;
  ctx.fillText('Ton ciel, chaque jour.', center, HEIGHT - 175);
  ctx.font = `500 30px ${SERIF}`;
  ctx.fillStyle = GOLD;
  ctx.fillText(window.location.host, center, HEIGHT - 125);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Image indisponible'))), 'image/png');
  });
};

export const shareDailyStory = async (content: StoryContent): Promise<ShareOutcome> => {
  const blob = await renderStory(content);
  const file = new File([blob], 'mon-ciel-du-jour.png', { type: 'image/png' });
  const link = `${window.location.origin}/?ref=story`;

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Mon ciel du jour', text: `Mon ciel du jour sur Night One\u00A0: ${link}` });
      return 'shared';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled';
      throw error;
    }
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = file.name;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
  return 'downloaded';
};
