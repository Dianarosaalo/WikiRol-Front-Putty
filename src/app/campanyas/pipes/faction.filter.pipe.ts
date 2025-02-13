import { Pipe, PipeTransform } from "@angular/core";

interface Faction {
  value: string;
  label: string;
}

@Pipe({
  name: 'factionsFilter',
  standalone: true,
})
export class FactionsFilterPipe implements PipeTransform {
  transform(
    factions: Faction[],
    search: string,
    alphabeticalSort?: boolean
  ): Faction[] {
    // Filter by search term
    let filteredFactions = factions.filter(faction =>
      faction.label.toLowerCase().includes(search.toLowerCase())
    );

    // Sort alphabetically if required
    if (alphabeticalSort) {
      filteredFactions = filteredFactions.sort((a, b) => a.label.localeCompare(b.label));
    }

    return filteredFactions;
  }
}
