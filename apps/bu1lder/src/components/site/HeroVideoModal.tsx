import { assetUrl } from '@/asset-url';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ambientVideo from "@/assets/hero/ambient.mp4.asset.json";

export function HeroVideoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="px-8 py-4 rounded-xl border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 font-semibold">
          <PlayCircle className="mr-1 size-4" /> Ver como funciona
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-white/10">
        <DialogTitle className="sr-only">Demonstração Bu1lder</DialogTitle>
        <div className="aspect-video w-full">
          <div className="flex h-full items-center justify-center p-8 text-center text-white">O vídeo de demonstração não veio no pacote de arquivos. Sua inclusão está registrada como pendência.</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
