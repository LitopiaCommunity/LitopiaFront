import { Component } from '@angular/core';
import {upFadeInAnimation} from "../../animations/up-fade-in.animation";
import {SeoService} from "../../utils/seo.service";

export interface SeasonDownload {
  name: string;
  version: string;
  size: string;
  downloadUrl: string;
  description: string;
  available: boolean;
  // type indique si la map est créative ou survie
  type?: 'creative' | 'survival';
  // année utilisée pour trier (valeur approximative extraite de la description)
  year?: number;
}

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss', './archives.component.theme.scss'],
  animations:[upFadeInAnimation]
})
export class ArchivesComponent {
  appearSet=new Set<string>();

  seasons: SeasonDownload[] = [
    {
      name: "Kraftopia",
      version: "1.8.x",
      size: "~? GB",
      downloadUrl: "#",
      description: "Le serveur originel qui a donné naissance à la communauté Litopia (2015)",
      available: false,
      type: 'survival',
      year: 2015
    },
    {
      name: "Litopia Saison 1",
      version: "1.11.x",
      size: "~? GB",
      downloadUrl: "#",
      description: "La première saison officielle de Litopia en monde amplifié (Janvier 2016)",
      available: false,
      type: 'survival',
      year: 2016
    },
    {
      name: "Litopia Saison 2",
      version: "1.12.x",
      size: "3.0 GB",
      downloadUrl: "https://cloud.louisvolat.fr/index.php/s/jo3KXBisaRpsxRb",
      description: "Générateur de monde vanilla spécial OTG avec plugins par Sekori (Août 2017)",
      available: true,
      type: 'survival',
      year: 2017
    },
    {
      name: "Litopia Saison Pirate",
      version: "1.13.x",
      size: "~3.8 GB",
      downloadUrl: "#",
      description: "La saison 3 sur le thème pirate, avec nouveau discord et nouveau site (Juillet 2018)",
      available: false,
      type: 'survival',
      year: 2018
    },
    {
      name: "Saison Oubliée",
      version: "1.14.x",
      size: "~? GB",
      downloadUrl: "#",
      description: "Saison mystérieuse et confidentielle élue meilleure saison (2019)",
      available: false,
      type: 'survival',
      year: 2019
    },
    {
      name: "Saison de Noël",
      version: "1.15.x",
      size: "~? GB",
      downloadUrl: "#",
      description: "Une saison festive où Noël durait tous les jours ! (Décembre 2019)",
      available: false,
      type: 'survival',
      year: 2019
    },
    {
      name: "Saison Litorona Virus",
      version: "1.15.x",
      size: "3.0 GB",
      downloadUrl: "https://cloud.louisvolat.fr/index.php/s/QJ9q6gdr47emM33",
      description: "La saison du confinement, quand tout le monde était là (Mars 2020)",
      available: true,
      type: 'survival',
      year: 2020
    },
    {
      name: "Litopia Saison 4",
      version: "1.16.x",
      size: "16.6 GB",
      downloadUrl: "https://cloud.louisvolat.fr/index.php/s/zjp75wjYHCmkXKY",
      description: "Une vraie saison comme à la bonne époque, absolument géniale (Juillet 2020)",
      available: true,
      type: 'survival',
      year: 2020
    },
    {
      name: "Saison Better Minecraft",
      version: "1.17.x (Modpack)",
      size: "~4.8 GB",
      downloadUrl: "#",
      description: "Saison mod pack Better Minecraft en attendant la 1.18 (Juin 2021)",
      available: false,
      type: 'survival',
      year: 2021
    },
    {
      name: "Litopia Saison 5",
      version: "1.18.x",
      size: "3.9 GB",
      downloadUrl: "https://cloud.louisvolat.fr/index.php/s/Mg8YBg3yTXHtX6q",
      description: "Rivalité entre Licorp et Union Litopiste. Guerre froide dans les montagnes (Décembre 2021)",
      available: true,
      type: 'survival',
      year: 2021
    },
    {
      name: "Litopia Saison 6",
      version: "1.19.x",
      size: "196.1 GB",
      downloadUrl: "https://cloud.louisvolat.fr/index.php/s/kTRGkgY4wpoPSiz",
      description: "Génération incroyable, propagande de waifus et apogée de la Likorp (Septembre 2022)",
      available: true,
      type: 'survival',
      year: 2022
    },
    {
      name: "Litopia Saison 7",
      version: "1.20.x",
      size: "~ 8.1 GB",
      downloadUrl: "#",
      description: "Version complète avec spawn reconstruit et immense ville japonaise (Archive en cours)",
      available: false,
      type: 'survival',
      year: 2023
    },
    {
      name: "Litopia Saison 8 - Vallée Fleurie",
      version: "1.21.x",
      size: "9.8 GB",
      downloadUrl: "https://cloud.louisvolat.fr/index.php/s/kK6awi7dAHdPS3L",
      description: "Saison de la simplicité et de la liberté. Seed choisie par vote, world border évolutive. Premiers signes d'essoufflement (Juin 2024)",
      available: true,
      type: 'survival',
      year: 2024
    },
    {
      name: "Litopia Créa (2019-2021)",
      version: "1.17.x",
      size: "526 MB",
      downloadUrl: "https://cloud.louisvolat.fr/index.php/s/mf54xB8cDkPaoCi",
      description: "Monde créatif où les Litopiens laissaient libre cours à leur imagination (2019-2021)",
      available: true,
      type: 'creative',
      year: 2021
    },
    {
      name: "Litopia Créa (2021-2023)",
      version: "1.20.x",
      size: "1.1 GB",
      downloadUrl: "https://cloud.louisvolat.fr/index.php/s/X2opLCe8o9RtbQR",
      description: "Monde créatif nouvelle génération avec les nouveaux biomes (2021-2023)",
      available: true,
      type: 'creative',
      year: 2023
    },
    {
      name: "Litopia Créa (2023-2026)",
      version: "1.21.x",
      size: "228 MB",
      downloadUrl: "https://cloud.louisvolat.fr/index.php/s/nReeWFy9Jf4nwce",
      description: "Monde créatif des dernières saison un peut moins actif que les autres (2023-2026)",
      available: true,
      type: 'creative',
      year: 2026
    }
  ];

  constructor(private seo: SeoService) {
    this.seo.generateTags({
      title: 'Litopia - Archives & Téléchargements',
      description: 'Téléchargez les maps historiques de Litopia (2015-2026). 8 maps disponibles + 2 mondes créatifs.',
    });
  }

  // getters qui renvoient les listes triées du plus récent au plus ancien
  get survivalSeasons(): SeasonDownload[] {
    return this.seasons
      .filter(s => s.type !== 'creative')
      .sort((a, b) => (b.year || 0) - (a.year || 0));
  }

  get creativeSeasons(): SeasonDownload[] {
    return this.seasons
      .filter(s => s.type === 'creative')
      .sort((a, b) => (b.year || 0) - (a.year || 0));
  }

  appear(appearName:string){
    this.appearSet.add(appearName)
  }

  isAppear(appearName:string){
    return this.appearSet.has(appearName)
  }
}
