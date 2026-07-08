import { Block } from 'payload/types';

/**
 * Journey Chapter Block
 * 
 * Presents a day or segment of the journey as a narrative "chapter"
 * with emotion-driven titles, atmospheric imagery, and story-like content.
 * 
 * This replaces the traditional "Day 1, Day 2" timeline approach
 * with an editorial, experience-first presentation style.
 */
export const JourneyChapter: Block = {
  slug: 'chapter',
  labels: {
    singular: 'Journey Chapter',
    plural: 'Journey Chapters',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show/hide this chapter.',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // CHAPTER HEADER
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'chapterTitle',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Evocative chapter title (e.g., "Where the Mountains Meet the Sky", "Dawn on the River").',
      },
    },
    {
      name: 'chapterSubtitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional subtitle or location context (e.g., "Kyoto • Temple District").',
      },
    },
    {
      name: 'chapterNumber',
      type: 'number',
      admin: {
        description: 'Optional chapter/day number. Leave empty for unnumbered narrative flow.',
      },
    },
    {
      name: 'chapterLabel',
      type: 'text',
      localized: true,
      admin: {
        description: 'Custom label (e.g., "Chapter One", "First Morning", "The Beginning"). Overrides number.',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // SOFT SCHEDULE LAYER (Subtle Day Markers)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'dayNumber',
      type: 'number',
      admin: {
        description: 'Optional day number for subtle schedule orientation (e.g., 1, 2, 3). Shows as "Day 1" etc.',
      },
    },
    {
      name: 'dayRangeStart',
      type: 'number',
      admin: {
        description: 'For multi-day chapters: starting day number.',
      },
    },
    {
      name: 'dayRangeEnd',
      type: 'number',
      admin: {
        description: 'For multi-day chapters: ending day number.',
      },
    },
    {
      name: 'timeHint',
      type: 'text',
      localized: true,
      admin: {
        description: 'Soft time context (e.g., "Morning arrival", "Full day exploration", "Evening departure").',
      },
    },
    {
      name: 'showDayIndicator',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show the subtle day indicator above this chapter.',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // CHAPTER IMAGE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Strong, atmospheric image that sets the mood for this chapter.',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'full-width',
      options: [
        { label: 'Full Width', value: 'full-width' },
        { label: 'Left Aligned', value: 'left' },
        { label: 'Right Aligned', value: 'right' },
        { label: 'Background', value: 'background' },
      ],
    },
    {
      name: 'imageAspectRatio',
      type: 'select',
      defaultValue: 'ratio_16_9',
      options: [
        { label: 'Cinematic (21:9)', value: 'ratio_21_9' },
        { label: 'Widescreen (16:9)', value: 'ratio_16_9' },
        { label: 'Standard (4:3)', value: 'ratio_4_3' },
        { label: 'Square (1:1)', value: 'ratio_1_1' },
        { label: 'Portrait (3:4)', value: 'ratio_3_4' },
      ],
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // NARRATIVE CONTENT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'narrative',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Short narrative text (3-5 lines). Focus on feeling, atmosphere, and sensory details.',
      },
    },
    {
      name: 'pullQuote',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional editorial pull quote to highlight (e.g., "The light was different here...").',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // SOFT JOURNEY FLOW (Optional)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'moments',
      type: 'array',
      label: 'Journey Moments',
      admin: {
        description: 'Optional soft time-based moments (morning/afternoon/evening). Keep minimal.',
      },
      fields: [
        {
          name: 'time',
          type: 'select',
          options: [
            { label: 'Dawn', value: 'dawn' },
            { label: 'Morning', value: 'morning' },
            { label: 'Midday', value: 'midday' },
            { label: 'Afternoon', value: 'afternoon' },
            { label: 'Dusk', value: 'dusk' },
            { label: 'Evening', value: 'evening' },
            { label: 'Night', value: 'night' },
          ],
        },
        {
          name: 'moment',
          type: 'text',
          localized: true,
          admin: {
            description: 'Brief description of the moment (e.g., "Temple gardens at first light").',
          },
        },
      ],
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // LOCATION REFERENCE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'location',
      type: 'group',
      label: 'Location',
      fields: [
        {
          name: 'city',
          type: 'relationship',
          relationTo: 'cities',
        },
        {
          name: 'customLocation',
          type: 'text',
          localized: true,
          admin: {
            description: 'Custom location name if not a city.',
          },
        },
      ],
    },
  ],
};
