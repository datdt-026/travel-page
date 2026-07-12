import { defaultLocale, locales } from "@/i18n";
import {
  createVietnamAutumnPhotographyTour,
  vietnamAutumnPhotographyTourSlug,
} from "@/data/mock/customTours";

interface MockFetchOptions {
  limit?: number;
  page?: number;
  status?: string;
  where?: Record<string, unknown>;
  depth?: number;
  locale?: string;
  fallbackLocale?: string | boolean;
}

interface MockPaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

function normalizeLocale(locale?: string): string {
  return locales.includes(locale as (typeof locales)[number])
    ? (locale as string)
    : defaultLocale;
}

async function loadCollection(
  endpoint: string,
  locale?: string,
): Promise<unknown[]> {
  const currentLocale = normalizeLocale(locale);

  try {
    const module = await import(
      `../data/mock/collections/${currentLocale}/${endpoint}.json`
    );
    return module.default || [];
  } catch {
    if (currentLocale !== defaultLocale) {
      return loadCollection(endpoint, defaultLocale);
    }
    return [];
  }
}

async function loadGlobal(
  slug: string,
  locale?: string,
): Promise<unknown | null> {
  const currentLocale = normalizeLocale(locale);

  try {
    const module = await import(
      `../data/mock/globals/${currentLocale}/${slug}.json`
    );
    return module.default || null;
  } catch {
    if (currentLocale !== defaultLocale) {
      return loadGlobal(slug, defaultLocale);
    }
    return null;
  }
}

async function withCustomCollectionData(
  endpoint: string,
  docs: unknown[],
  locale?: string,
) {
  if (endpoint !== "itineraries") return docs;

  const [countries, cities] = await Promise.all([
    loadCollection("countries", locale),
    loadCollection("cities", locale),
  ]);
  const customTour = createVietnamAutumnPhotographyTour(
    countries as Record<string, unknown>[],
    cities as Record<string, unknown>[],
    normalizeLocale(locale),
  );

  return [
    customTour,
    ...docs.filter((doc) => {
      const record = doc as Record<string, unknown>;
      return record.slug !== vietnamAutumnPhotographyTourSlug;
    }),
  ];
}

function getComparableValues(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value.flatMap(getComparableValues);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return [record.id, record.slug, record.name, record.title, value].filter(
      Boolean,
    );
  }

  return [value];
}

function equalsFilter(actual: unknown, expected: unknown): boolean {
  return getComparableValues(actual).some(
    (value) => String(value) === String(expected),
  );
}

function matchesWhere(
  doc: Record<string, unknown>,
  where?: Record<string, unknown>,
): boolean {
  if (!where) return true;

  return Object.entries(where).every(([field, condition]) => {
    const actual = doc[field];

    if (
      condition &&
      typeof condition === "object" &&
      !Array.isArray(condition)
    ) {
      return Object.entries(condition as Record<string, unknown>).every(
        ([operator, expected]) => {
          if (operator === "equals") return equalsFilter(actual, expected);
          if (operator === "not_equals") return !equalsFilter(actual, expected);
          if (operator === "in" && Array.isArray(expected)) {
            return expected.some((item) => equalsFilter(actual, item));
          }
          if (operator === "contains" && typeof expected === "string") {
            return getComparableValues(actual).some((value) =>
              String(value).toLowerCase().includes(expected.toLowerCase()),
            );
          }
          return true;
        },
      );
    }

    return equalsFilter(actual, condition);
  });
}

function paginate<T>(
  docs: T[],
  limit = 10,
  page = 1,
): MockPaginatedResponse<T> {
  const totalDocs = docs.length;
  const safeLimit = Math.max(limit, 1);
  const totalPages = Math.ceil(totalDocs / safeLimit);
  const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const start = (safePage - 1) * safeLimit;
  const paginatedDocs = docs.slice(start, start + safeLimit);

  return {
    docs: paginatedDocs,
    totalDocs,
    limit: safeLimit,
    totalPages,
    page: safePage,
    pagingCounter: totalDocs === 0 ? 0 : start + 1,
    hasPrevPage: safePage > 1,
    hasNextPage: safePage < totalPages,
    prevPage: safePage > 1 ? safePage - 1 : null,
    nextPage: safePage < totalPages ? safePage + 1 : null,
  };
}

export async function fetchFromMock<T>(
  endpoint: string,
  options: MockFetchOptions = {},
): Promise<MockPaginatedResponse<T>> {
  const { limit = 10, page = 1, status, where, locale } = options;

  const docs = (await withCustomCollectionData(
    endpoint,
    await loadCollection(endpoint, locale),
    locale,
  )) as Record<string, unknown>[];
  const filteredDocs = docs.filter((doc) => {
    const statusMatches = status ? equalsFilter(doc.status, status) : true;
    return statusMatches && matchesWhere(doc, where);
  }) as T[];

  return paginate(filteredDocs, limit, page);
}

export async function fetchOneFromMock<T>(
  endpoint: string,
  slug: string,
  options: Pick<MockFetchOptions, "depth" | "locale"> = {},
): Promise<T | null> {
  const response = await fetchFromMock<T>(endpoint, {
    locale: options.locale,
    limit: 1,
    where: { slug: { equals: slug } },
  });

  return response.docs[0] || null;
}

export async function fetchGlobalFromMock<T>(
  slug: string,
  options: Pick<MockFetchOptions, "depth" | "locale"> = {},
): Promise<T | null> {
  return loadGlobal(slug, options.locale) as Promise<T | null>;
}
