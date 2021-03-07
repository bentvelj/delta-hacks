export function generateAbbrev(province: string) {
  switch (province) {
    case 'Ontario':
      return 'ON';

    case 'Manitoba':
      return 'MB';

    case 'Saskatchewan':
      return 'SK';

    case 'Alberta':
      return 'AB';

    case 'British Columbia':
      return 'BC';

    case 'Yukon':
      return 'YT';

    case 'Northwest Territories':
      return 'NT';

    case 'Nunavut':
      return 'NU';

    case 'Newfoundland and Labrador':
      return 'NL';

    case 'Prince Edward Island':
      return 'PE';

    case 'Nova Scotia':
      return 'NS';

    case 'New Brunswick':
      return 'NB';

    case 'Quebec':
      return 'QC';

    default:
      return 'ON';
  }
}
