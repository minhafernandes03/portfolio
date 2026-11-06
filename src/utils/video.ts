/**
 * Converte um link de partilha (Box ou Google Drive) num link "embed",
 * para o vídeo poder ser reproduzido diretamente dentro do site.
 * Se o link não for reconhecido, devolve null (e o site mostra só o botão "Abrir vídeo").
 */
export function getEmbedUrl(url?: string): string | null {
  if (!url) return null;

  // Box: https://app.box.com/s/<id>  ->  https://app.box.com/embed/s/<id>
  const box = url.match(/app\.box\.com\/s\/([a-z0-9]+)/i);
  if (box) return `https://app.box.com/embed/s/${box[1]}`;

  // Google Drive: https://drive.google.com/file/d/<id>/view  ->  .../preview
  const drive = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/i);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;

  // YouTube / Vimeo (caso venhas a usar no futuro)
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/i);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/i);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}
