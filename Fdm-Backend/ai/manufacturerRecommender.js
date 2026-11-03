import ManufacturerProfile from '../models/ManufacturerProfile.js';

function scoreManufacturer(project, manufacturer) {
  let score = 0;
  const reasons = [];

  const categoryMatch = manufacturer.specializations?.some(
    (s) => s.toLowerCase() === project.category?.toLowerCase()
  );
  if (categoryMatch) {
    score += 40;
    reasons.push(`Specializes in ${project.category}`);
  }

  const moqFits = project.quantity >= (manufacturer.minimumOrderQuantity || 0);
  if (moqFits) {
    score += 30;
    reasons.push(`MOQ (${manufacturer.minimumOrderQuantity || 0}) fits your quantity`);
  }

  if (manufacturer.verified) {
    score += 15;
    reasons.push('Verified manufacturer');
  }

  const ratingScore = ((manufacturer.rating || 0) / 5) * 15;
  score += ratingScore;
  if (manufacturer.rating > 0) {
    reasons.push(`Rated ${manufacturer.rating}/5`);
  }

  return { score: Math.round(score), reasons };
}

export async function recommendManufacturers(project, limit = 5) {
  const manufacturers = await ManufacturerProfile.find().populate('userId', 'name');

  const scored = manufacturers
    .map((m) => {
      const { score, reasons } = scoreManufacturer(project, m);
      return {
        manufacturerId: m._id,
        userId: m.userId?._id,
        companyName: m.companyName,
        location: m.location,
        minimumOrderQuantity: m.minimumOrderQuantity,
        specializations: m.specializations,
        verified: m.verified,
        rating: m.rating,
        matchScore: score,
        reasons,
      };
    })
    .filter((m) => m.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);

  return scored;
}