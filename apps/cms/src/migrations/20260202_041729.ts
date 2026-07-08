import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "public"."_locales" AS ENUM('en', 'vi', 'fr', 'de');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'author');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_continent" AS ENUM('africa', 'asia', 'europe', 'north-america', 'oceania', 'south-america');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attractions_category" AS ENUM('landmark', 'museum', 'park', 'beach', 'religious-site', 'entertainment', 'shopping', 'restaurant', 'nature', 'historical', 'adventure', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attractions_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_difficulty" AS ENUM('easy', 'moderate', 'challenging');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_travel_style" AS ENUM('adventure', 'cultural', 'relaxation', 'foodie', 'family', 'romantic', 'budget', 'luxury', 'solo', 'backpacking');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_days_accommodation_type" AS ENUM('hotel', 'hostel', 'airbnb', 'resort', 'camping', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_intro_image_style" AS ENUM('full-bleed', 'contained', 'split');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_chapter_image_position" AS ENUM('full-width', 'left', 'right', 'background');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_chapter_image_aspect_ratio" AS ENUM('ratio_21_9', 'ratio_16_9', 'ratio_4_3', 'ratio_1_1', 'ratio_3_4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_chapter_moments_time" AS ENUM('dawn', 'morning', 'midday', 'afternoon', 'dusk', 'evening', 'night');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_experience_experience_type" AS ENUM('culture-heritage', 'nature-landscape', 'culinary', 'local-encounters', 'wellness', 'adventure', 'art-architecture', 'slow-travel', 'hidden-gems');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_experience_layout" AS ENUM('stacked', 'editorial-grid', 'masonry', 'featured-list');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_interlude_interlude_type" AS ENUM('quote', 'image', 'image-caption', 'reflection', 'transition');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_interlude_image_height" AS ENUM('small', 'medium', 'large', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_gallery_layout" AS ENUM('editorial', 'masonry', 'horizontal', 'staggered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_gallery_spacing" AS ENUM('tight', 'comfortable', 'generous');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_essentials_categories_category_type" AS ENUM('best-time', 'packing', 'getting-there', 'local-tips', 'climate', 'cultural-notes', 'practical');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_blocks_essentials_layout" AS ENUM('minimal', 'cards', 'accordion');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_presentation_mode" AS ENUM('editorial', 'classic');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_packing_list_category" AS ENUM('clothing', 'electronics', 'toiletries', 'documents', 'gear', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itineraries_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_blog_posts_category" AS ENUM('travel-tips', 'destinations', 'food-drink', 'adventure', 'culture', 'budget', 'eco-travel', 'solo-travel', 'family-travel', 'guides', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_pages_content_blocks_block_type" AS ENUM('text', 'image', 'info-card');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_faqs_category" AS ENUM('general', 'using-travelsite', 'trip-planning', 'bookings', 'account', 'technical', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'read', 'replied', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_partner_inquiries_company_type" AS ENUM('tour_operator', 'travel_agency', 'ota', 'mice', 'corporate', 'luxury', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_partner_inquiries_annual_volume" AS ENUM('under_100', '100_500', '500_1000', '1000_5000', 'over_5000', 'new_market');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_partner_inquiries_partnership_type" AS ENUM('fit', 'series', 'white_label', 'undecided');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_partner_inquiries_status" AS ENUM('new', 'contacted', 'in-discussion', 'qualified', 'not-qualified', 'converted', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_partner_inquiries_priority" AS ENUM('high', 'normal', 'low');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_site_footer_social_links_platform" AS ENUM('facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'pinterest', 'tiktok');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_hero_media_type" AS ENUM('image', 'video');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_hero_content_position" AS ENUM('top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_hero_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_b2b_value_proposition_highlights_icon" AS ENUM('handshake', 'globe', 'shield', 'clock');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_b2b_value_proposition_variant" AS ENUM('premium', 'standard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_b2b_services_overview_variant" AS ENUM('cards', 'horizontal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_b2b_services_overview_services_icon" AS ENUM('fit', 'series', 'mice', 'luxury', 'adventure', 'wellness');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_b2b_credentials_variant" AS ENUM('floating', 'timeline', 'showcase');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_b2b_credentials_items_type" AS ENUM('stat', 'certification', 'award', 'membership');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_b2b_partner_showcase_variant" AS ENUM('marquee', 'grid', 'featured');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_home_page_b2b_cta_variant" AS ENUM('cinematic', 'split', 'minimal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_destinations_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_destinations_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_destinations_page_hero_content_position" AS ENUM('top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_destinations_page_hero_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_destinations_page_listing_layout" AS ENUM('grid', 'list', 'cards');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_destinations_page_listing_columns" AS ENUM('2', '3', '4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_destinations_page_featured_display_mode" AS ENUM('auto', 'manual');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_blog_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_blog_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_blog_page_hero_content_position" AS ENUM('top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_blog_page_hero_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_blog_page_listing_layout" AS ENUM('grid', 'list', 'magazine');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_blog_page_listing_columns" AS ENUM('2', '3', '4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_about_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_about_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_about_page_hero_content_position" AS ENUM('top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_about_page_hero_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_about_page_mission_image_position" AS ENUM('left', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_about_page_values_columns" AS ENUM('2', '3', '4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_about_page_values_background_color" AS ENUM('default', 'light', 'dark');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_about_page_stats_background_color" AS ENUM('light', 'dark', 'accent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_contact_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_contact_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_contact_page_hero_content_position" AS ENUM('top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_contact_page_hero_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_contact_page_social_links_platform" AS ENUM('facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok', 'pinterest');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_contact_page_map_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_faq_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_faq_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_faq_page_hero_content_position" AS ENUM('top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_faq_page_hero_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_faq_page_listing_style" AS ENUM('accordion', 'cards', 'list');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_faq_page_contact_cta_background_color" AS ENUM('light', 'dark', 'accent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_page_hero_content_position" AS ENUM('top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_page_hero_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_page_listing_layout" AS ENUM('grid', 'list', 'map');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_page_listing_columns" AS ENUM('2', '3', '4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_page_listing_sort_options" AS ENUM('name', 'popular', 'newest');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_page_featured_display_mode" AS ENUM('auto', 'manual');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_page_featured_layout" AS ENUM('grid', 'carousel', 'featured-grid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_cities_page_countries_section_display_style" AS ENUM('flags', 'cards', 'list');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_page_hero_content_position" AS ENUM('top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_page_hero_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_page_listing_layout" AS ENUM('grid', 'cards', 'map');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_page_listing_columns" AS ENUM('2', '3', '4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_page_featured_display_mode" AS ENUM('auto', 'manual');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_page_featured_layout" AS ENUM('grid', 'cards', 'carousel');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_countries_page_regions_overview_display_style" AS ENUM('cards', 'map', 'links');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_hero_height" AS ENUM('small', 'medium', 'large', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy', 'gradient');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_hero_content_position" AS ENUM('bottom-left', 'bottom-center', 'bottom-right', 'center-left', 'center', 'center-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_hero_animation_style" AS ENUM('none', 'fade-in', 'fade-up', 'slide-in');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_content_layout_layout" AS ENUM('sidebar-right', 'sidebar-left', 'full-width', 'centered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_content_layout_sidebar_width" AS ENUM('narrow', 'normal', 'wide');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_content_layout_content_max_width" AS ENUM('default', 'narrow', 'wide', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_sections_tips_style" AS ENUM('cards', 'list', 'accordion');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_sections_gallery_style" AS ENUM('grid', 'masonry', 'carousel', 'lightbox');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_sections_gallery_columns" AS ENUM('2', '3', '4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_category_labels_category" AS ENUM('landmark', 'museum', 'park', 'beach', 'religious-site', 'entertainment', 'shopping', 'restaurant', 'nature', 'historical', 'adventure', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_schema_schema_type" AS ENUM('TouristAttraction', 'LocalBusiness', 'Museum', 'Park', 'Place');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_attraction_detail_config_schema_twitter_card_type" AS ENUM('summary', 'summary_large_image');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_hero_height" AS ENUM('small', 'medium', 'large', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy', 'gradient');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_hero_content_position" AS ENUM('bottom-left', 'bottom-center', 'bottom-right', 'center-left', 'center', 'center-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_hero_animation_style" AS ENUM('none', 'fade-in', 'fade-up', 'slide-in');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_content_layout_layout" AS ENUM('sidebar-right', 'sidebar-left', 'full-width', 'centered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_content_layout_sidebar_width" AS ENUM('narrow', 'normal', 'wide');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_sections_highlights_style" AS ENUM('cards', 'list', 'grid', 'icons');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_sections_gallery_style" AS ENUM('grid', 'masonry', 'carousel', 'lightbox');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_sections_gallery_columns" AS ENUM('2', '3', '4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_sections_attractions_display_style" AS ENUM('by-category', 'grid', 'list', 'cards');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_category_labels_category" AS ENUM('landmark', 'museum', 'park', 'beach', 'religious-site', 'entertainment', 'shopping', 'restaurant', 'nature', 'historical', 'adventure', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_city_detail_config_schema_schema_type" AS ENUM('City', 'Place', 'TouristDestination');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_hero_height" AS ENUM('small', 'medium', 'large', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy', 'gradient');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_hero_content_position" AS ENUM('bottom-left', 'bottom-center', 'bottom-right', 'center-left', 'center', 'center-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_hero_animation_style" AS ENUM('none', 'fade-in', 'fade-up', 'slide-in');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_content_layout_layout" AS ENUM('sidebar-right', 'sidebar-left', 'full-width', 'centered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_content_layout_sidebar_width" AS ENUM('narrow', 'normal', 'wide');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_sections_gallery_style" AS ENUM('grid', 'masonry', 'carousel', 'lightbox');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_sections_gallery_columns" AS ENUM('2', '3', '4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_sections_cities_display_style" AS ENUM('grid', 'cards', 'list', 'map');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_sections_cities_columns" AS ENUM('2', '3', '4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_continent_labels_continent" AS ENUM('africa', 'asia', 'europe', 'north-america', 'oceania', 'south-america');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_country_detail_config_schema_schema_type" AS ENUM('Country', 'Place', 'TouristDestination');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_default_presentation_mode" AS ENUM('editorial', 'classic');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_hero_height" AS ENUM('medium', 'large', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy', 'gradient');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_hero_content_position" AS ENUM('bottom-left', 'bottom-center', 'bottom-right', 'center-left', 'center', 'center-right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_hero_animation_style" AS ENUM('none', 'fade-in', 'fade-up', 'slide-in');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_editorial_layout_layout" AS ENUM('full-width', 'centered-sidebar', 'magazine');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_editorial_layout_section_spacing" AS ENUM('comfortable', 'generous', 'dramatic');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_editorial_layout_sidebar_style" AS ENUM('minimal', 'cards');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_content_layout_layout" AS ENUM('sidebar-right', 'sidebar-left', 'full-width', 'centered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_content_layout_sidebar_width" AS ENUM('narrow', 'normal', 'wide');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_sections_day_by_day_style" AS ENUM('timeline', 'cards', 'accordion', 'tabs');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_sections_activities_style" AS ENUM('cards', 'list', 'timeline');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_sections_packing_list_style" AS ENUM('checklist', 'categories', 'grid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_difficulty_labels_difficulty" AS ENUM('easy', 'moderate', 'challenging');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_travel_style_labels_style" AS ENUM('adventure', 'cultural', 'relaxation', 'foodie', 'family', 'romantic', 'budget', 'luxury', 'solo', 'backpacking');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_packing_category_labels_category" AS ENUM('clothing', 'electronics', 'toiletries', 'documents', 'gear', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_itinerary_detail_config_schema_schema_type" AS ENUM('TravelAction', 'Trip', 'Itinerary', 'Article');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_expertise_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_expertise_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_expertise_page_services_layout" AS ENUM('cards', 'featured');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_sustainability_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_sustainability_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_sustainability_page_initiatives_items_status" AS ENUM('active', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_sustainability_page_op_standards_practices_status" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_sustainability_page_practices_categories_color" AS ENUM('emerald', 'blue', 'amber', 'rose', 'purple');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_case_studies_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_case_studies_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_case_studies_page_partner_statements_layout" AS ENUM('horizontal', 'vertical');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_case_studies_page_partner_statements_statements_status" AS ENUM('published', 'hidden');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_partners_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_partners_page_hero_overlay_style" AS ENUM('none', 'light', 'medium', 'heavy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_partners_page_partnership_models_layout" AS ENUM('cards', 'alternating');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_partners_page_stats_background_color" AS ENUM('light', 'dark', 'accent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_partner_inquiry_page_hero_height" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"role" "enum_users_role" NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"caption" varchar,
	"credit" varchar,
	"prefix" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_hero_url" varchar,
	"sizes_hero_width" numeric,
	"sizes_hero_height" numeric,
	"sizes_hero_mime_type" varchar,
	"sizes_hero_filesize" numeric,
	"sizes_hero_filename" varchar
);

CREATE TABLE IF NOT EXISTS "countries_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"continent" "enum_countries_continent" NOT NULL,
	"currency" varchar,
	"language" varchar,
	"timezone" varchar,
	"status" "enum_countries_status" NOT NULL,
	"published_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "countries_locales" (
	"name" varchar NOT NULL,
	"description" jsonb NOT NULL,
	"excerpt" varchar NOT NULL,
	"best_time_to_visit" varchar,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "countries_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "countries_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "cities_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "cities_highlights" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar
);

CREATE TABLE IF NOT EXISTS "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"population" numeric,
	"coordinates_latitude" numeric,
	"coordinates_longitude" numeric,
	"status" "enum_cities_status" NOT NULL,
	"published_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "cities_locales" (
	"name" varchar NOT NULL,
	"description" jsonb NOT NULL,
	"excerpt" varchar NOT NULL,
	"local_tips" jsonb,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "cities_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "cities_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"countries_id" integer,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "attractions_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "attractions_tips" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"tip" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "attractions" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"category" "enum_attractions_category" NOT NULL,
	"coordinates_latitude" numeric,
	"coordinates_longitude" numeric,
	"ticket_price_adult" numeric,
	"ticket_price_child" numeric,
	"ticket_price_currency" varchar,
	"ticket_price_notes" varchar,
	"visit_duration" varchar,
	"rating" numeric,
	"website" varchar,
	"status" "enum_attractions_status" NOT NULL,
	"published_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "attractions_locales" (
	"name" varchar NOT NULL,
	"description" jsonb NOT NULL,
	"excerpt" varchar NOT NULL,
	"address" varchar,
	"opening_hours" varchar,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "attractions_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "attractions_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"cities_id" integer,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "itineraries_travel_style" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_itineraries_travel_style",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "itineraries_days_activities" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"time" varchar,
	"activity" varchar NOT NULL,
	"description" varchar,
	"duration" varchar
);

CREATE TABLE IF NOT EXISTS "itineraries_days" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"day_number" numeric NOT NULL,
	"title" varchar NOT NULL,
	"description" jsonb,
	"accommodation_name" varchar,
	"accommodation_type" "enum_itineraries_days_accommodation_type",
	"accommodation_notes" varchar,
	"meals_breakfast" varchar,
	"meals_lunch" varchar,
	"meals_dinner" varchar
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_intro_essence" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_intro_essence_locales" (
	"theme" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_intro_essence_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_intro" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"enabled" boolean,
	"imageStyle" "enum_itineraries_blocks_intro_image_style",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_intro_locales" (
	"opening_line" varchar,
	"narrative" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_intro_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_chapter_moments" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"time" "enum_itineraries_blocks_chapter_moments_time"
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_chapter_moments_locales" (
	"moment" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_chapter_moments_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_chapter" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"enabled" boolean,
	"chapter_number" numeric,
	"day_number" numeric,
	"day_range_start" numeric,
	"day_range_end" numeric,
	"show_day_indicator" boolean,
	"imagePosition" "enum_itineraries_blocks_chapter_image_position",
	"imageAspectRatio" "enum_itineraries_blocks_chapter_image_aspect_ratio",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_chapter_locales" (
	"chapter_title" varchar NOT NULL,
	"chapter_subtitle" varchar,
	"chapter_label" varchar,
	"time_hint" varchar,
	"narrative" jsonb,
	"pull_quote" varchar,
	"location_custom_location" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_chapter_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_experience_experiences" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_experience_experiences_locales" (
	"title" varchar NOT NULL,
	"description" jsonb,
	"atmosphere" varchar,
	"location" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_experience_experiences_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_experience" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"enabled" boolean,
	"experienceType" "enum_itineraries_blocks_experience_experience_type" NOT NULL,
	"layout" "enum_itineraries_blocks_experience_layout",
	"show_divider" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_experience_locales" (
	"title" varchar,
	"introduction" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_experience_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_interlude" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"enabled" boolean,
	"interludeType" "enum_itineraries_blocks_interlude_interlude_type" NOT NULL,
	"imageHeight" "enum_itineraries_blocks_interlude_image_height",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_interlude_locales" (
	"quote" varchar,
	"quote_attribution" varchar,
	"reflection" jsonb,
	"transition_text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_interlude_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_gallery_images" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"featured" boolean
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_gallery_images_locales" (
	"caption" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_gallery_images_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"enabled" boolean,
	"layout" "enum_itineraries_blocks_gallery_layout",
	"spacing" "enum_itineraries_blocks_gallery_spacing",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_gallery_locales" (
	"title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_gallery_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_essentials_categories_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_essentials_categories_items_locales" (
	"item" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_essentials_categories_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_essentials_categories" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"categoryType" "enum_itineraries_blocks_essentials_categories_category_type" NOT NULL
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_essentials_categories_locales" (
	"title" varchar,
	"content" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_essentials_categories_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_essentials" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"enabled" boolean,
	"layout" "enum_itineraries_blocks_essentials_layout",
	"show_icon" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "itineraries_blocks_essentials_locales" (
	"title" varchar,
	"introduction" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itineraries_blocks_essentials_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_packing_list" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"item" varchar NOT NULL,
	"category" "enum_itineraries_packing_list_category"
);

CREATE TABLE IF NOT EXISTS "itineraries" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"duration" numeric NOT NULL,
	"difficulty" "enum_itineraries_difficulty",
	"estimated_budget_min" numeric,
	"estimated_budget_max" numeric,
	"estimated_budget_currency" varchar,
	"estimated_budget_notes" varchar,
	"presentationMode" "enum_itineraries_presentation_mode",
	"status" "enum_itineraries_status" NOT NULL,
	"published_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "itineraries_locales" (
	"title" varchar NOT NULL,
	"description" jsonb NOT NULL,
	"excerpt" varchar NOT NULL,
	"tips" jsonb,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "itineraries_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"locale" "_locales",
	"media_id" integer,
	"countries_id" integer,
	"cities_id" integer,
	"attractions_id" integer,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"category" "enum_blog_posts_category" NOT NULL,
	"read_time" varchar,
	"status" "enum_blog_posts_status" NOT NULL,
	"published_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "blog_posts_locales" (
	"title" varchar NOT NULL,
	"excerpt" varchar NOT NULL,
	"content" jsonb NOT NULL,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "blog_posts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "blog_posts_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "pages_content_blocks" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"blockType" "enum_pages_content_blocks_block_type" NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "pages_content_blocks_locales" (
	"title" varchar,
	"text" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "pages_content_blocks_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"status" "enum_pages_status" NOT NULL,
	"published_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_locales" (
	"title" varchar NOT NULL,
	"excerpt" varchar,
	"content" jsonb NOT NULL,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "pages_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "pages_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" "enum_faqs_category" NOT NULL,
	"order" numeric,
	"status" "enum_faqs_status" NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "faqs_locales" (
	"question" varchar NOT NULL,
	"answer" varchar NOT NULL,
	"answer_rich_text" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "faqs_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "case_studies_delivery_approach" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"heading" varchar NOT NULL,
	"content" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "case_studies_responsible_practices" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_locale" "_locales" NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"practice" varchar NOT NULL,
	"application" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "case_studies_measurable_results" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "case_studies_measurable_results_locales" (
	"label" varchar NOT NULL,
	"context" varchar,
	"measurement_method" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "case_studies_measurable_results_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "case_studies" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"destination" varchar NOT NULL,
	"region" varchar,
	"overview_duration" varchar,
	"featured" boolean,
	"order" numeric,
	"status" "enum_case_studies_status" NOT NULL,
	"published_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "case_studies_locales" (
	"title" varchar NOT NULL,
	"summary" varchar NOT NULL,
	"overview_case_context" varchar,
	"overview_journey_type" varchar,
	"overview_operating_environment" varchar,
	"learnings_key_learnings" varchar,
	"learnings_future_application" varchar,
	"learnings_continuous_improvement" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "case_studies_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "case_studies_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"countries_id" integer,
	"media_id" integer,
	"case_studies_id" integer,
	"itineraries_id" integer
);

CREATE TABLE IF NOT EXISTS "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"subject" varchar,
	"message" varchar NOT NULL,
	"status" "enum_contact_submissions_status",
	"notes" varchar,
	"source" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "partner_inquiries_destinations_of_interest" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"destination" varchar
);

CREATE TABLE IF NOT EXISTS "partner_inquiries_services_of_interest" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"service" varchar
);

CREATE TABLE IF NOT EXISTS "partner_inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_name" varchar NOT NULL,
	"website" varchar,
	"country" varchar NOT NULL,
	"companyType" "enum_partner_inquiries_company_type" NOT NULL,
	"contact_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar,
	"role" varchar,
	"annualVolume" "enum_partner_inquiries_annual_volume",
	"partnershipType" "enum_partner_inquiries_partnership_type",
	"message" varchar,
	"how_did_you_hear" varchar,
	"locale" varchar,
	"status" "enum_partner_inquiries_status",
	"priority" "enum_partner_inquiries_priority",
	"internal_notes" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "partner_inquiries_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "site_header_navigation_children" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "site_header_navigation_children_locales" (
	"label" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "site_header_navigation_children_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "site_header_navigation" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link" varchar NOT NULL,
	"highlight" boolean
);

CREATE TABLE IF NOT EXISTS "site_header_navigation_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "site_header_navigation_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "site_header" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo_text" varchar,
	"cta_button_enabled" boolean,
	"cta_button_link" varchar,
	"settings_show_language_switcher" boolean,
	"settings_sticky" boolean,
	"settings_transparent" boolean,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "site_header_locales" (
	"logo_alt_text" varchar,
	"cta_button_label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "site_header_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "site_header_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "site_footer_columns_links" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link" varchar NOT NULL,
	"external" boolean
);

CREATE TABLE IF NOT EXISTS "site_footer_columns_links_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "site_footer_columns_links_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "site_footer_columns" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "site_footer_columns_locales" (
	"title" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "site_footer_columns_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "site_footer_social_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"platform" "enum_site_footer_social_links_platform" NOT NULL,
	"url" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "site_footer_bottom_bar_legal_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "site_footer_bottom_bar_legal_links_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "site_footer_bottom_bar_legal_links_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "site_footer" (
	"id" serial PRIMARY KEY NOT NULL,
	"newsletter_enabled" boolean,
	"social_enabled" boolean,
	"contact_enabled" boolean,
	"contact_email" varchar,
	"contact_phone" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "site_footer_locales" (
	"brand_description" varchar,
	"brand_tagline" varchar,
	"newsletter_title" varchar,
	"newsletter_description" varchar,
	"newsletter_placeholder" varchar,
	"newsletter_button_text" varchar,
	"contact_address" varchar,
	"bottom_bar_copyright_text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "site_footer_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "site_footer_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "home_page_testimonials_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"author" varchar NOT NULL,
	"location" varchar
);

CREATE TABLE IF NOT EXISTS "home_page_testimonials_items_locales" (
	"quote" varchar NOT NULL,
	"trip" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "home_page_testimonials_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_stats_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_stats_items_locales" (
	"label" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "home_page_b2b_stats_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_value_proposition_highlights" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" "enum_home_page_b2b_value_proposition_highlights_icon"
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_value_proposition_highlights_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "home_page_b2b_value_proposition_highlights_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_services_overview_services_features" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_services_overview_services_features_locales" (
	"feature" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "home_page_b2b_services_overview_services_features_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_services_overview_services" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" "enum_home_page_b2b_services_overview_services_icon",
	"stats_value" varchar,
	"link" varchar
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_services_overview_services_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"stats_label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "home_page_b2b_services_overview_services_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_credentials_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_home_page_b2b_credentials_items_type" NOT NULL,
	"value" varchar NOT NULL,
	"year" varchar
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_credentials_items_locales" (
	"label" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "home_page_b2b_credentials_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_partner_showcase_partners" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"country" varchar,
	"url" varchar,
	"representative" varchar
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_partner_showcase_partners_locales" (
	"testimonial" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "home_page_b2b_partner_showcase_partners_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_cta_stats" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "home_page_b2b_cta_stats_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "home_page_b2b_cta_stats_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "home_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_mediaType" "enum_home_page_hero_media_type",
	"hero_cta_link" varchar,
	"hero_overlayStyle" "enum_home_page_hero_overlay_style",
	"hero_contentPosition" "enum_home_page_hero_content_position",
	"hero_textAlignment" "enum_home_page_hero_text_alignment",
	"hero_styling_section_background" varchar,
	"hero_styling_title_color" varchar,
	"hero_styling_subtitle_color" varchar,
	"hero_styling_text_color" varchar,
	"hero_styling_accent_color" varchar,
	"hero_styling_button_background" varchar,
	"hero_styling_button_text_color" varchar,
	"philosophy_enabled" boolean,
	"philosophy_styling_section_background" varchar,
	"philosophy_styling_title_color" varchar,
	"philosophy_styling_subtitle_color" varchar,
	"philosophy_styling_text_color" varchar,
	"philosophy_styling_accent_color" varchar,
	"philosophy_styling_button_background" varchar,
	"philosophy_styling_button_text_color" varchar,
	"destinations_enabled" boolean,
	"destinations_cta_link" varchar,
	"destinations_limit" numeric,
	"destinations_styling_section_background" varchar,
	"destinations_styling_card_background" varchar,
	"destinations_styling_card_border_color" varchar,
	"destinations_styling_title_color" varchar,
	"destinations_styling_subtitle_color" varchar,
	"destinations_styling_text_color" varchar,
	"destinations_styling_card_title_color" varchar,
	"destinations_styling_card_text_color" varchar,
	"destinations_styling_accent_color" varchar,
	"destinations_styling_button_background" varchar,
	"destinations_styling_button_text_color" varchar,
	"experiences_enabled" boolean,
	"experiences_limit" numeric,
	"experiences_styling_section_background" varchar,
	"experiences_styling_card_background" varchar,
	"experiences_styling_card_border_color" varchar,
	"experiences_styling_title_color" varchar,
	"experiences_styling_subtitle_color" varchar,
	"experiences_styling_text_color" varchar,
	"experiences_styling_card_title_color" varchar,
	"experiences_styling_card_text_color" varchar,
	"experiences_styling_accent_color" varchar,
	"experiences_styling_button_background" varchar,
	"experiences_styling_button_text_color" varchar,
	"testimonials_enabled" boolean,
	"testimonials_styling_section_background" varchar,
	"testimonials_styling_title_color" varchar,
	"testimonials_styling_subtitle_color" varchar,
	"testimonials_styling_text_color" varchar,
	"testimonials_styling_accent_color" varchar,
	"testimonials_styling_button_background" varchar,
	"testimonials_styling_button_text_color" varchar,
	"cta_enabled" boolean,
	"cta_primary_cta_link" varchar,
	"cta_secondary_cta_link" varchar,
	"cta_styling_section_background" varchar,
	"cta_styling_title_color" varchar,
	"cta_styling_subtitle_color" varchar,
	"cta_styling_text_color" varchar,
	"cta_styling_accent_color" varchar,
	"cta_styling_button_background" varchar,
	"cta_styling_button_text_color" varchar,
	"b2b_stats_enabled" boolean,
	"b2b_stats_styling_section_background" varchar,
	"b2b_stats_styling_card_background" varchar,
	"b2b_stats_styling_card_border_color" varchar,
	"b2b_stats_styling_title_color" varchar,
	"b2b_stats_styling_subtitle_color" varchar,
	"b2b_stats_styling_text_color" varchar,
	"b2b_stats_styling_card_title_color" varchar,
	"b2b_stats_styling_card_text_color" varchar,
	"b2b_stats_styling_accent_color" varchar,
	"b2b_stats_styling_button_background" varchar,
	"b2b_stats_styling_button_text_color" varchar,
	"b2b_value_proposition_enabled" boolean,
	"b2b_value_proposition_cta_link" varchar,
	"b2b_value_proposition_secondary_cta_link" varchar,
	"b2bValueProposition_variant" "enum_home_page_b2b_value_proposition_variant",
	"b2b_value_proposition_styling_section_background" varchar,
	"b2b_value_proposition_styling_card_background" varchar,
	"b2b_value_proposition_styling_card_border_color" varchar,
	"b2b_value_proposition_styling_title_color" varchar,
	"b2b_value_proposition_styling_subtitle_color" varchar,
	"b2b_value_proposition_styling_text_color" varchar,
	"b2b_value_proposition_styling_card_title_color" varchar,
	"b2b_value_proposition_styling_card_text_color" varchar,
	"b2b_value_proposition_styling_accent_color" varchar,
	"b2b_value_proposition_styling_button_background" varchar,
	"b2b_value_proposition_styling_button_text_color" varchar,
	"b2b_services_overview_enabled" boolean,
	"b2bServicesOverview_variant" "enum_home_page_b2b_services_overview_variant",
	"b2b_services_overview_styling_section_background" varchar,
	"b2b_services_overview_styling_card_background" varchar,
	"b2b_services_overview_styling_card_border_color" varchar,
	"b2b_services_overview_styling_title_color" varchar,
	"b2b_services_overview_styling_subtitle_color" varchar,
	"b2b_services_overview_styling_text_color" varchar,
	"b2b_services_overview_styling_card_title_color" varchar,
	"b2b_services_overview_styling_card_text_color" varchar,
	"b2b_services_overview_styling_accent_color" varchar,
	"b2b_services_overview_styling_button_background" varchar,
	"b2b_services_overview_styling_button_text_color" varchar,
	"b2b_credentials_enabled" boolean,
	"b2bCredentials_variant" "enum_home_page_b2b_credentials_variant",
	"b2b_credentials_styling_section_background" varchar,
	"b2b_credentials_styling_card_background" varchar,
	"b2b_credentials_styling_card_border_color" varchar,
	"b2b_credentials_styling_title_color" varchar,
	"b2b_credentials_styling_subtitle_color" varchar,
	"b2b_credentials_styling_text_color" varchar,
	"b2b_credentials_styling_card_title_color" varchar,
	"b2b_credentials_styling_card_text_color" varchar,
	"b2b_credentials_styling_accent_color" varchar,
	"b2b_credentials_styling_button_background" varchar,
	"b2b_credentials_styling_button_text_color" varchar,
	"b2b_partner_showcase_enabled" boolean,
	"b2bPartnerShowcase_variant" "enum_home_page_b2b_partner_showcase_variant",
	"b2b_partner_showcase_cta_link" varchar,
	"b2b_partner_showcase_styling_section_background" varchar,
	"b2b_partner_showcase_styling_card_background" varchar,
	"b2b_partner_showcase_styling_card_border_color" varchar,
	"b2b_partner_showcase_styling_title_color" varchar,
	"b2b_partner_showcase_styling_subtitle_color" varchar,
	"b2b_partner_showcase_styling_text_color" varchar,
	"b2b_partner_showcase_styling_card_title_color" varchar,
	"b2b_partner_showcase_styling_card_text_color" varchar,
	"b2b_partner_showcase_styling_accent_color" varchar,
	"b2b_partner_showcase_styling_button_background" varchar,
	"b2b_partner_showcase_styling_button_text_color" varchar,
	"b2b_cta_enabled" boolean,
	"b2bCta_variant" "enum_home_page_b2b_cta_variant",
	"b2b_cta_primary_button_link" varchar,
	"b2b_cta_secondary_button_link" varchar,
	"b2b_cta_styling_section_background" varchar,
	"b2b_cta_styling_title_color" varchar,
	"b2b_cta_styling_subtitle_color" varchar,
	"b2b_cta_styling_text_color" varchar,
	"b2b_cta_styling_accent_color" varchar,
	"b2b_cta_styling_button_background" varchar,
	"b2b_cta_styling_button_text_color" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "home_page_locales" (
	"hero_title" varchar,
	"hero_brand_name" varchar,
	"hero_subtitle" varchar,
	"hero_cta_text" varchar,
	"philosophy_tagline" varchar,
	"philosophy_statement" varchar,
	"philosophy_signature" varchar,
	"destinations_title" varchar,
	"destinations_subtitle" varchar,
	"destinations_cta_text" varchar,
	"experiences_title" varchar,
	"experiences_subtitle" varchar,
	"testimonials_title" varchar,
	"cta_title" varchar,
	"cta_subtitle" varchar,
	"cta_description" varchar,
	"cta_primary_cta_text" varchar,
	"cta_secondary_cta_text" varchar,
	"b2b_value_proposition_eyebrow" varchar,
	"b2b_value_proposition_title" varchar,
	"b2b_value_proposition_subtitle" varchar,
	"b2b_value_proposition_cta_text" varchar,
	"b2b_value_proposition_secondary_cta_text" varchar,
	"b2b_services_overview_eyebrow" varchar,
	"b2b_services_overview_title" varchar,
	"b2b_services_overview_description" varchar,
	"b2b_credentials_eyebrow" varchar,
	"b2b_credentials_title" varchar,
	"b2b_credentials_subtitle" varchar,
	"b2b_partner_showcase_eyebrow" varchar,
	"b2b_partner_showcase_title" varchar,
	"b2b_partner_showcase_description" varchar,
	"b2b_partner_showcase_cta_text" varchar,
	"b2b_cta_eyebrow" varchar,
	"b2b_cta_title" varchar,
	"b2b_cta_description" varchar,
	"b2b_cta_primary_button_text" varchar,
	"b2b_cta_secondary_button_text" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "home_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "home_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"countries_id" integer,
	"itineraries_id" integer
);

CREATE TABLE IF NOT EXISTS "destinations_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_destinations_page_hero_height",
	"hero_overlayStyle" "enum_destinations_page_hero_overlay_style",
	"hero_contentPosition" "enum_destinations_page_hero_content_position",
	"hero_textAlignment" "enum_destinations_page_hero_text_alignment",
	"hero_show_breadcrumb" boolean,
	"listing_items_per_page" numeric,
	"listing_layout" "enum_destinations_page_listing_layout",
	"listing_columns" "enum_destinations_page_listing_columns",
	"listing_show_filters" boolean,
	"listing_filter_options_show_continent_filter" boolean,
	"listing_filter_options_show_travel_style_filter" boolean,
	"listing_filter_options_show_season_filter" boolean,
	"listing_show_search" boolean,
	"featured_enabled" boolean,
	"featured_displayMode" "enum_destinations_page_featured_display_mode",
	"featured_limit" numeric,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "destinations_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"hero_breadcrumb_label" varchar,
	"introduction_title" varchar,
	"introduction_content" jsonb,
	"listing_search_placeholder" varchar,
	"featured_title" varchar,
	"featured_subtitle" varchar,
	"empty_state_title" varchar,
	"empty_state_message" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "destinations_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "destinations_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"countries_id" integer
);

CREATE TABLE IF NOT EXISTS "blog_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_blog_page_hero_height",
	"hero_overlayStyle" "enum_blog_page_hero_overlay_style",
	"hero_contentPosition" "enum_blog_page_hero_content_position",
	"hero_textAlignment" "enum_blog_page_hero_text_alignment",
	"hero_show_breadcrumb" boolean,
	"listing_posts_per_page" numeric,
	"listing_layout" "enum_blog_page_listing_layout",
	"listing_columns" "enum_blog_page_listing_columns",
	"listing_show_categories" boolean,
	"listing_show_search" boolean,
	"listing_show_featured_section" boolean,
	"listing_featured_posts_count" numeric,
	"empty_state_show_c_t_a" boolean,
	"empty_state_cta_link" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "blog_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"hero_breadcrumb_label" varchar,
	"empty_state_title" varchar,
	"empty_state_message" varchar,
	"empty_state_cta_text" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "blog_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "blog_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "about_page_values_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "about_page_values_items_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "about_page_values_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "about_page_why_choose_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "about_page_why_choose_items_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "about_page_why_choose_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "about_page_team_members" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"socials_linkedin" varchar,
	"socials_twitter" varchar,
	"socials_instagram" varchar
);

CREATE TABLE IF NOT EXISTS "about_page_team_members_locales" (
	"role" varchar,
	"bio" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "about_page_team_members_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "about_page_stats_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "about_page_stats_items_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "about_page_stats_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "about_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_about_page_hero_height",
	"hero_overlayStyle" "enum_about_page_hero_overlay_style",
	"hero_contentPosition" "enum_about_page_hero_content_position",
	"hero_textAlignment" "enum_about_page_hero_text_alignment",
	"hero_show_accent_line" boolean,
	"intro_enabled" boolean,
	"story_enabled" boolean,
	"mission_enabled" boolean,
	"mission_imagePosition" "enum_about_page_mission_image_position",
	"values_enabled" boolean,
	"values_columns" "enum_about_page_values_columns",
	"values_backgroundColor" "enum_about_page_values_background_color",
	"why_choose_enabled" boolean,
	"team_enabled" boolean,
	"stats_enabled" boolean,
	"stats_backgroundColor" "enum_about_page_stats_background_color",
	"cta_enabled" boolean,
	"cta_primary_button_link" varchar,
	"cta_secondary_button_link" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "about_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"intro_title" varchar,
	"intro_content" varchar,
	"story_eyebrow" varchar,
	"story_title" varchar,
	"story_content" varchar,
	"story_highlight" varchar,
	"mission_eyebrow" varchar,
	"mission_title" varchar,
	"mission_content" jsonb,
	"values_eyebrow" varchar,
	"values_title" varchar,
	"why_choose_eyebrow" varchar,
	"why_choose_title" varchar,
	"team_title" varchar,
	"team_subtitle" varchar,
	"cta_title" varchar,
	"cta_subtitle" varchar,
	"cta_primary_button_text" varchar,
	"cta_secondary_button_text" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "about_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "about_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "contact_page_social_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"platform" "enum_contact_page_social_links_platform",
	"url" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "contact_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_contact_page_hero_height",
	"hero_overlayStyle" "enum_contact_page_hero_overlay_style",
	"hero_contentPosition" "enum_contact_page_hero_content_position",
	"hero_textAlignment" "enum_contact_page_hero_text_alignment",
	"contact_info_email_icon" varchar,
	"contact_info_email_value" varchar,
	"contact_info_phone_icon" varchar,
	"contact_info_phone_value" varchar,
	"contact_info_address_icon" varchar,
	"contact_info_address_map_link" varchar,
	"contact_info_hours_icon" varchar,
	"form_enabled" boolean,
	"social_enabled" boolean,
	"map_enabled" boolean,
	"map_embed_url" varchar,
	"map_height" "enum_contact_page_map_height",
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "contact_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"contact_info_section_title" varchar,
	"contact_info_email_label" varchar,
	"contact_info_email_description" varchar,
	"contact_info_phone_label" varchar,
	"contact_info_phone_description" varchar,
	"contact_info_address_label" varchar,
	"contact_info_address_value" varchar,
	"contact_info_hours_label" varchar,
	"contact_info_hours_value" varchar,
	"form_title" varchar,
	"form_subtitle" varchar,
	"form_fields_name_placeholder" varchar,
	"form_fields_email_placeholder" varchar,
	"form_fields_subject_placeholder" varchar,
	"form_fields_message_placeholder" varchar,
	"form_fields_submit_button_text" varchar,
	"form_success_message" varchar,
	"form_error_message" varchar,
	"social_title" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "contact_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "contact_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "faq_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_faq_page_hero_height",
	"hero_overlayStyle" "enum_faq_page_hero_overlay_style",
	"hero_contentPosition" "enum_faq_page_hero_content_position",
	"hero_textAlignment" "enum_faq_page_hero_text_alignment",
	"hero_show_breadcrumb" boolean,
	"search_enabled" boolean,
	"listing_show_categories" boolean,
	"listing_style" "enum_faq_page_listing_style",
	"listing_allow_multiple_open" boolean,
	"listing_expand_first_item" boolean,
	"contact_cta_enabled" boolean,
	"contact_cta_button_link" varchar,
	"contactCta_backgroundColor" "enum_faq_page_contact_cta_background_color",
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "faq_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"hero_breadcrumb_label" varchar,
	"search_placeholder" varchar,
	"contact_cta_title" varchar,
	"contact_cta_subtitle" varchar,
	"contact_cta_button_text" varchar,
	"empty_state_title" varchar,
	"empty_state_message" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "faq_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "faq_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "itineraries_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_show_filters" boolean,
	"listing_show_search" boolean,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "itineraries_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"hero_eyebrow" varchar,
	"listing_search_placeholder" varchar,
	"empty_state_title" varchar,
	"empty_state_message" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "itineraries_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itineraries_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "attractions_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_max_items" numeric,
	"listing_show_filters" boolean,
	"listing_show_search" boolean,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "attractions_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"hero_note" varchar,
	"listing_search_placeholder" varchar,
	"empty_state_title" varchar,
	"empty_state_message" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "attractions_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "attractions_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "cities_page_listing_sort_options" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_cities_page_listing_sort_options",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "cities_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_cities_page_hero_height",
	"hero_overlayStyle" "enum_cities_page_hero_overlay_style",
	"hero_contentPosition" "enum_cities_page_hero_content_position",
	"hero_textAlignment" "enum_cities_page_hero_text_alignment",
	"hero_show_breadcrumb" boolean,
	"listing_items_per_page" numeric,
	"listing_layout" "enum_cities_page_listing_layout",
	"listing_columns" "enum_cities_page_listing_columns",
	"listing_show_filters" boolean,
	"listing_filter_options_show_country_filter" boolean,
	"listing_filter_options_show_region_filter" boolean,
	"listing_show_search" boolean,
	"featured_enabled" boolean,
	"featured_displayMode" "enum_cities_page_featured_display_mode",
	"featured_limit" numeric,
	"featured_layout" "enum_cities_page_featured_layout",
	"countries_section_enabled" boolean,
	"countriesSection_displayStyle" "enum_cities_page_countries_section_display_style",
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "cities_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"hero_breadcrumb_label" varchar,
	"listing_search_placeholder" varchar,
	"featured_title" varchar,
	"featured_subtitle" varchar,
	"countries_section_title" varchar,
	"empty_state_title" varchar,
	"empty_state_message" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "cities_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "cities_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"cities_id" integer
);

CREATE TABLE IF NOT EXISTS "countries_page_listing_regions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "countries_page_listing_regions_locales" (
	"label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "countries_page_listing_regions_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "countries_page_regions_overview_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"region_id" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "countries_page_regions_overview_items_locales" (
	"name" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "countries_page_regions_overview_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "countries_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_countries_page_hero_height",
	"hero_overlayStyle" "enum_countries_page_hero_overlay_style",
	"hero_contentPosition" "enum_countries_page_hero_content_position",
	"hero_textAlignment" "enum_countries_page_hero_text_alignment",
	"hero_show_breadcrumb" boolean,
	"listing_layout" "enum_countries_page_listing_layout",
	"listing_columns" "enum_countries_page_listing_columns",
	"listing_show_search" boolean,
	"listing_show_region_filter" boolean,
	"listing_show_city_count" boolean,
	"listing_show_flags" boolean,
	"featured_enabled" boolean,
	"featured_displayMode" "enum_countries_page_featured_display_mode",
	"featured_limit" numeric,
	"featured_layout" "enum_countries_page_featured_layout",
	"regions_overview_enabled" boolean,
	"regionsOverview_displayStyle" "enum_countries_page_regions_overview_display_style",
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "countries_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"hero_breadcrumb_label" varchar,
	"listing_search_placeholder" varchar,
	"featured_title" varchar,
	"featured_subtitle" varchar,
	"regions_overview_title" varchar,
	"empty_state_title" varchar,
	"empty_state_message" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "countries_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "countries_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer,
	"countries_id" integer
);

CREATE TABLE IF NOT EXISTS "attraction_detail_config_category_labels" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"category" "enum_attraction_detail_config_category_labels_category" NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "attraction_detail_config_category_labels_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "attraction_detail_config_category_labels_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "attraction_detail_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_attraction_detail_config_hero_height",
	"hero_overlayStyle" "enum_attraction_detail_config_hero_overlay_style",
	"hero_contentPosition" "enum_attraction_detail_config_hero_content_position",
	"hero_show_breadcrumb" boolean,
	"hero_show_category" boolean,
	"hero_show_rating" boolean,
	"hero_animationStyle" "enum_attraction_detail_config_hero_animation_style",
	"contentLayout_layout" "enum_attraction_detail_config_content_layout_layout",
	"contentLayout_sidebarWidth" "enum_attraction_detail_config_content_layout_sidebar_width",
	"contentLayout_contentMaxWidth" "enum_attraction_detail_config_content_layout_content_max_width",
	"content_layout_stickybar" boolean,
	"sections_show_description" boolean,
	"sections_show_tips" boolean,
	"sections_tipsStyle" "enum_attraction_detail_config_sections_tips_style",
	"sections_show_gallery" boolean,
	"sections_galleryStyle" "enum_attraction_detail_config_sections_gallery_style",
	"sections_galleryColumns" "enum_attraction_detail_config_sections_gallery_columns",
	"sections_show_map" boolean,
	"sections_show_related_attractions" boolean,
	"sections_related_attractions_limit" numeric,
	"sections_show_nearby_attractions" boolean,
	"sidebar_show_visitor_info" boolean,
	"sidebar_show_location" boolean,
	"sidebar_show_address" boolean,
	"sidebar_show_opening_hours" boolean,
	"sidebar_show_ticket_price" boolean,
	"sidebar_show_visit_duration" boolean,
	"sidebar_show_website" boolean,
	"sidebar_show_share_button" boolean,
	"sidebar_show_booking_c_t_a" boolean,
	"sidebar_booking_cta_link" varchar,
	"schema_enable_json_ld" boolean,
	"schema_schemaType" "enum_attraction_detail_config_schema_schema_type",
	"schema_enable_open_graph" boolean,
	"schema_enable_twitter_card" boolean,
	"schema_twitterCardType" "enum_attraction_detail_config_schema_twitter_card_type",
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "attraction_detail_config_locales" (
	"sidebar_booking_cta_text" varchar,
	"labels_visitor_tips_title" varchar,
	"labels_gallery_title" varchar,
	"labels_visitor_info_title" varchar,
	"labels_related_title" varchar,
	"labels_nearby_title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "attraction_detail_config_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "city_detail_config_category_labels" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"category" "enum_city_detail_config_category_labels_category" NOT NULL
);

CREATE TABLE IF NOT EXISTS "city_detail_config_category_labels_locales" (
	"label" varchar NOT NULL,
	"plural_label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "city_detail_config_category_labels_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "city_detail_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_city_detail_config_hero_height",
	"hero_overlayStyle" "enum_city_detail_config_hero_overlay_style",
	"hero_contentPosition" "enum_city_detail_config_hero_content_position",
	"hero_show_breadcrumb" boolean,
	"hero_show_country_name" boolean,
	"hero_show_population" boolean,
	"hero_animationStyle" "enum_city_detail_config_hero_animation_style",
	"contentLayout_layout" "enum_city_detail_config_content_layout_layout",
	"contentLayout_sidebarWidth" "enum_city_detail_config_content_layout_sidebar_width",
	"content_layout_stickybar" boolean,
	"sections_show_description" boolean,
	"sections_show_highlights" boolean,
	"sections_highlightsStyle" "enum_city_detail_config_sections_highlights_style",
	"sections_show_local_tips" boolean,
	"sections_show_gallery" boolean,
	"sections_galleryStyle" "enum_city_detail_config_sections_gallery_style",
	"sections_galleryColumns" "enum_city_detail_config_sections_gallery_columns",
	"sections_show_map" boolean,
	"sections_show_attractions" boolean,
	"sections_attractionsDisplayStyle" "enum_city_detail_config_sections_attractions_display_style",
	"sections_attractions_limit" numeric,
	"sections_show_itineraries" boolean,
	"sections_itineraries_limit" numeric,
	"sections_show_weather" boolean,
	"sections_show_best_time_to_visit" boolean,
	"sidebar_show_quick_facts" boolean,
	"sidebar_show_country_link" boolean,
	"sidebar_show_population" boolean,
	"sidebar_show_coordinates" boolean,
	"sidebar_show_best_time_to_visit" boolean,
	"sidebar_show_share_button" boolean,
	"sidebar_show_travel_c_t_a" boolean,
	"sidebar_travel_cta_link" varchar,
	"schema_enable_json_ld" boolean,
	"schema_schemaType" "enum_city_detail_config_schema_schema_type",
	"schema_enable_open_graph" boolean,
	"schema_enable_twitter_card" boolean,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "city_detail_config_locales" (
	"sidebar_travel_cta_text" varchar,
	"labels_about_title" varchar,
	"labels_highlights_title" varchar,
	"labels_local_tips_title" varchar,
	"labels_gallery_title" varchar,
	"labels_attractions_title" varchar,
	"labels_itineraries_title" varchar,
	"labels_quick_facts_title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "city_detail_config_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "country_detail_config_continent_labels" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"continent" "enum_country_detail_config_continent_labels_continent" NOT NULL
);

CREATE TABLE IF NOT EXISTS "country_detail_config_continent_labels_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "country_detail_config_continent_labels_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "country_detail_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_country_detail_config_hero_height",
	"hero_overlayStyle" "enum_country_detail_config_hero_overlay_style",
	"hero_contentPosition" "enum_country_detail_config_hero_content_position",
	"hero_show_breadcrumb" boolean,
	"hero_show_continent" boolean,
	"hero_show_flag" boolean,
	"hero_animationStyle" "enum_country_detail_config_hero_animation_style",
	"contentLayout_layout" "enum_country_detail_config_content_layout_layout",
	"contentLayout_sidebarWidth" "enum_country_detail_config_content_layout_sidebar_width",
	"content_layout_stickybar" boolean,
	"sections_show_description" boolean,
	"sections_show_gallery" boolean,
	"sections_galleryStyle" "enum_country_detail_config_sections_gallery_style",
	"sections_galleryColumns" "enum_country_detail_config_sections_gallery_columns",
	"sections_show_cities" boolean,
	"sections_citiesDisplayStyle" "enum_country_detail_config_sections_cities_display_style",
	"sections_citiesColumns" "enum_country_detail_config_sections_cities_columns",
	"sections_cities_limit" numeric,
	"sections_show_itineraries" boolean,
	"sections_itineraries_limit" numeric,
	"sections_show_attractions" boolean,
	"sections_attractions_limit" numeric,
	"sections_show_travel_info" boolean,
	"sections_show_best_time_to_visit" boolean,
	"sections_show_map" boolean,
	"sidebar_show_quick_facts" boolean,
	"sidebar_show_continent" boolean,
	"sidebar_show_currency" boolean,
	"sidebar_show_language" boolean,
	"sidebar_show_timezone" boolean,
	"sidebar_show_best_time_to_visit" boolean,
	"sidebar_show_city_count" boolean,
	"sidebar_show_share_button" boolean,
	"sidebar_show_travel_c_t_a" boolean,
	"sidebar_travel_cta_link" varchar,
	"schema_enable_json_ld" boolean,
	"schema_schemaType" "enum_country_detail_config_schema_schema_type",
	"schema_enable_open_graph" boolean,
	"schema_enable_twitter_card" boolean,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "country_detail_config_locales" (
	"sidebar_travel_cta_text" varchar,
	"labels_about_title" varchar,
	"labels_cities_title" varchar,
	"labels_gallery_title" varchar,
	"labels_itineraries_title" varchar,
	"labels_attractions_title" varchar,
	"labels_travel_info_title" varchar,
	"labels_quick_facts_title" varchar,
	"labels_best_time_title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "country_detail_config_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itinerary_detail_config_difficulty_labels" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"difficulty" "enum_itinerary_detail_config_difficulty_labels_difficulty" NOT NULL,
	"color" varchar
);

CREATE TABLE IF NOT EXISTS "itinerary_detail_config_difficulty_labels_locales" (
	"label" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itinerary_detail_config_difficulty_labels_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itinerary_detail_config_travel_style_labels" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"style" "enum_itinerary_detail_config_travel_style_labels_style" NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "itinerary_detail_config_travel_style_labels_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itinerary_detail_config_travel_style_labels_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itinerary_detail_config_packing_category_labels" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"category" "enum_itinerary_detail_config_packing_category_labels_category" NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "itinerary_detail_config_packing_category_labels_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "itinerary_detail_config_packing_category_labels_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "itinerary_detail_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"defaultPresentationMode" "enum_itinerary_detail_config_default_presentation_mode",
	"hero_height" "enum_itinerary_detail_config_hero_height",
	"hero_overlayStyle" "enum_itinerary_detail_config_hero_overlay_style",
	"hero_contentPosition" "enum_itinerary_detail_config_hero_content_position",
	"hero_show_breadcrumb" boolean,
	"hero_show_duration" boolean,
	"hero_show_difficulty" boolean,
	"hero_show_travel_styles" boolean,
	"hero_max_travel_styles_in_hero" numeric,
	"hero_animationStyle" "enum_itinerary_detail_config_hero_animation_style",
	"editorialLayout_layout" "enum_itinerary_detail_config_editorial_layout_layout",
	"editorialLayout_sectionSpacing" "enum_itinerary_detail_config_editorial_layout_section_spacing",
	"editorial_layout_show_table_of_contents" boolean,
	"editorial_layout_show_progress_indicator" boolean,
	"editorial_layout_show_sidebar" boolean,
	"editorialLayout_sidebarStyle" "enum_itinerary_detail_config_editorial_layout_sidebar_style",
	"contentLayout_layout" "enum_itinerary_detail_config_content_layout_layout",
	"contentLayout_sidebarWidth" "enum_itinerary_detail_config_content_layout_sidebar_width",
	"content_layout_stickybar" boolean,
	"sections_show_introduction" boolean,
	"sections_show_day_by_day" boolean,
	"sections_dayByDayStyle" "enum_itinerary_detail_config_sections_day_by_day_style",
	"sections_show_activities" boolean,
	"sections_activitiesStyle" "enum_itinerary_detail_config_sections_activities_style",
	"sections_show_accommodation" boolean,
	"sections_show_meals" boolean,
	"sections_show_packing_list" boolean,
	"sections_packingListStyle" "enum_itinerary_detail_config_sections_packing_list_style",
	"sections_show_tips" boolean,
	"sections_show_map" boolean,
	"sections_show_gallery" boolean,
	"sections_show_related_itineraries" boolean,
	"sections_related_itineraries_limit" numeric,
	"sidebar_show_trip_details" boolean,
	"sidebar_show_duration" boolean,
	"sidebar_show_difficulty" boolean,
	"sidebar_show_budget" boolean,
	"sidebar_show_countries" boolean,
	"sidebar_show_cities" boolean,
	"sidebar_show_travel_styles" boolean,
	"sidebar_show_author" boolean,
	"sidebar_show_share_button" boolean,
	"sidebar_show_download_p_d_f" boolean,
	"sidebar_show_booking_c_t_a" boolean,
	"sidebar_booking_cta_link" varchar,
	"sidebar_show_quick_jump" boolean,
	"schema_enable_json_ld" boolean,
	"schema_schemaType" "enum_itinerary_detail_config_schema_schema_type",
	"schema_enable_open_graph" boolean,
	"schema_enable_twitter_card" boolean,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "itinerary_detail_config_locales" (
	"sidebar_booking_cta_text" varchar,
	"labels_day_by_day_title" varchar,
	"labels_trip_details_title" varchar,
	"labels_packing_list_title" varchar,
	"labels_tips_title" varchar,
	"labels_accommodation_label" varchar,
	"labels_meals_label" varchar,
	"labels_duration_label" varchar,
	"labels_difficulty_label" varchar,
	"labels_budget_label" varchar,
	"labels_countries_label" varchar,
	"labels_cities_label" varchar,
	"labels_related_title" varchar,
	"labels_day_label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "itinerary_detail_config_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_services_items_features" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "expertise_page_services_items_features_locales" (
	"text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_services_items_features_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_services_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "expertise_page_services_items_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_services_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_coverage_regions_highlights" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "expertise_page_coverage_regions_highlights_locales" (
	"text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_coverage_regions_highlights_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_coverage_regions_key_attractions" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "expertise_page_coverage_regions_key_attractions_locales" (
	"text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_coverage_regions_key_attractions_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_coverage_regions_travel_styles" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "expertise_page_coverage_regions_travel_styles_locales" (
	"text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_coverage_regions_travel_styles_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_coverage_regions_languages" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "expertise_page_coverage_regions_languages_locales" (
	"text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_coverage_regions_languages_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_coverage_regions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"highlighted" boolean
);

CREATE TABLE IF NOT EXISTS "expertise_page_coverage_regions_locales" (
	"name" varchar NOT NULL,
	"countries" varchar,
	"description" varchar,
	"best_time" varchar,
	"local_team" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_coverage_regions_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_capacity_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "expertise_page_capacity_items_locales" (
	"label" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_capacity_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_quality_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_url" varchar
);

CREATE TABLE IF NOT EXISTS "expertise_page_quality_items_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"link_text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_quality_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_why_us_items_details" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "expertise_page_why_us_items_details_locales" (
	"text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_why_us_items_details_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_why_us_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar,
	"stat" varchar
);

CREATE TABLE IF NOT EXISTS "expertise_page_why_us_items_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"stat_label" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "expertise_page_why_us_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_expertise_page_hero_height",
	"hero_overlayStyle" "enum_expertise_page_hero_overlay_style",
	"services_enabled" boolean,
	"services_layout" "enum_expertise_page_services_layout",
	"coverage_enabled" boolean,
	"capacity_enabled" boolean,
	"quality_enabled" boolean,
	"why_us_enabled" boolean,
	"why_us_cta_link" varchar,
	"cta_enabled" boolean,
	"cta_primary_button_link" varchar,
	"cta_secondary_button_link" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "expertise_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"services_eyebrow" varchar,
	"services_title" varchar,
	"services_description" varchar,
	"coverage_eyebrow" varchar,
	"coverage_title" varchar,
	"coverage_description" varchar,
	"capacity_eyebrow" varchar,
	"capacity_title" varchar,
	"quality_eyebrow" varchar,
	"quality_title" varchar,
	"quality_description" varchar,
	"why_us_eyebrow" varchar,
	"why_us_title" varchar,
	"why_us_description" varchar,
	"why_us_cta_text" varchar,
	"cta_title" varchar,
	"cta_description" varchar,
	"cta_primary_button_text" varchar,
	"cta_secondary_button_text" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "expertise_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "expertise_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "sustainability_page_certifications_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"year" varchar,
	"link" varchar
);

CREATE TABLE IF NOT EXISTS "sustainability_page_certifications_items_locales" (
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "sustainability_page_certifications_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page_initiatives_items_op_approach" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "sustainability_page_initiatives_items_op_approach_locales" (
	"text" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "sustainability_page_initiatives_items_op_approach_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page_initiatives_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"order" numeric NOT NULL,
	"status" "enum_sustainability_page_initiatives_items_status" NOT NULL
);

CREATE TABLE IF NOT EXISTS "sustainability_page_initiatives_items_locales" (
	"title" varchar NOT NULL,
	"location" varchar NOT NULL,
	"description" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "sustainability_page_initiatives_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page_op_standards_practices_details" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "sustainability_page_op_standards_practices_details_locales" (
	"text" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "sustainability_page_op_standards_practices_details_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page_op_standards_practices" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"order" numeric NOT NULL,
	"status" "enum_sustainability_page_op_standards_practices_status" NOT NULL
);

CREATE TABLE IF NOT EXISTS "sustainability_page_op_standards_practices_locales" (
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "sustainability_page_op_standards_practices_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page_practices_categories_practices" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "sustainability_page_practices_categories_practices_locales" (
	"title" varchar,
	"description" varchar,
	"details" varchar,
	"impact" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "sustainability_page_practices_categories_practices_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page_practices_categories" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar,
	"color" "enum_sustainability_page_practices_categories_color"
);

CREATE TABLE IF NOT EXISTS "sustainability_page_practices_categories_locales" (
	"title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "sustainability_page_practices_categories_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page_supplier_standards_criteria" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "sustainability_page_supplier_standards_criteria_locales" (
	"text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "sustainability_page_supplier_standards_criteria_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page_impact_items_measurement_method" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "sustainability_page_impact_items_measurement_method_locales" (
	"text" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "sustainability_page_impact_items_measurement_method_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page_impact_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "sustainability_page_impact_items_locales" (
	"label" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "sustainability_page_impact_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_sustainability_page_hero_height",
	"hero_overlayStyle" "enum_sustainability_page_hero_overlay_style",
	"philosophy_enabled" boolean,
	"certifications_enabled" boolean,
	"initiatives_enabled" boolean,
	"op_standards_enabled" boolean,
	"practices_enabled" boolean,
	"supplier_standards_enabled" boolean,
	"impact_enabled" boolean,
	"impact_year" varchar,
	"cta_enabled" boolean,
	"cta_primary_button_link" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "sustainability_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"philosophy_eyebrow" varchar,
	"philosophy_title" varchar,
	"philosophy_statement" jsonb,
	"certifications_eyebrow" varchar,
	"certifications_title" varchar,
	"certifications_description" varchar,
	"initiatives_eyebrow" varchar,
	"initiatives_title" varchar,
	"op_standards_eyebrow" varchar,
	"op_standards_title" varchar,
	"op_standards_introduction" varchar,
	"practices_eyebrow" varchar,
	"practices_title" varchar,
	"practices_description" varchar,
	"supplier_standards_eyebrow" varchar,
	"supplier_standards_title" varchar,
	"supplier_standards_description" jsonb,
	"impact_eyebrow" varchar,
	"impact_title" varchar,
	"cta_title" varchar,
	"cta_description" varchar,
	"cta_primary_button_text" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "sustainability_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "sustainability_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "case_studies_page_partner_logos_logos" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"country" varchar,
	"link" varchar
);

CREATE TABLE IF NOT EXISTS "case_studies_page_case_studies_items_metrics" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "case_studies_page_case_studies_items_metrics_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "case_studies_page_case_studies_items_metrics_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "case_studies_page_case_studies_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"slug" varchar,
	"partner_name" varchar,
	"partner_country" varchar,
	"featured" boolean,
	"featured_order" numeric
);

CREATE TABLE IF NOT EXISTS "case_studies_page_case_studies_items_locales" (
	"title" varchar NOT NULL,
	"destination" varchar,
	"delivery_summary" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "case_studies_page_case_studies_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "case_studies_page_partner_statements_statements" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"partner_role" varchar,
	"partner_type" varchar NOT NULL,
	"region" varchar,
	"order" numeric,
	"status" "enum_case_studies_page_partner_statements_statements_status"
);

CREATE TABLE IF NOT EXISTS "case_studies_page_partner_statements_statements_locales" (
	"quote" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "case_studies_page_partner_statements_statements_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "case_studies_page_testimonials_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"author_name" varchar,
	"author_role" varchar,
	"company_name" varchar,
	"company_country" varchar
);

CREATE TABLE IF NOT EXISTS "case_studies_page_testimonials_items_locales" (
	"quote" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "case_studies_page_testimonials_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "case_studies_page_partnership_types_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "case_studies_page_partnership_types_items_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "case_studies_page_partnership_types_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "case_studies_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_case_studies_page_hero_height",
	"hero_overlayStyle" "enum_case_studies_page_hero_overlay_style",
	"intro_enabled" boolean,
	"partner_logos_enabled" boolean,
	"case_studies_enabled" boolean,
	"partner_statements_enabled" boolean,
	"partnerStatements_layout" "enum_case_studies_page_partner_statements_layout",
	"testimonials_enabled" boolean,
	"partnership_types_enabled" boolean,
	"cta_enabled" boolean,
	"cta_primary_button_link" varchar,
	"cta_secondary_button_link" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "case_studies_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"intro_eyebrow" varchar,
	"intro_title" varchar,
	"intro_description" varchar,
	"partner_logos_title" varchar,
	"case_studies_eyebrow" varchar,
	"case_studies_title" varchar,
	"case_studies_subtitle" varchar,
	"partner_statements_title" varchar,
	"partner_statements_review_context" varchar,
	"testimonials_eyebrow" varchar,
	"testimonials_title" varchar,
	"partnership_types_eyebrow" varchar,
	"partnership_types_title" varchar,
	"cta_title" varchar,
	"cta_description" varchar,
	"cta_primary_button_text" varchar,
	"cta_secondary_button_text" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "case_studies_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "case_studies_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "partners_page_value_proposition_benefits" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "partners_page_value_proposition_benefits_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "partners_page_value_proposition_benefits_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "pp_model_features" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "pp_model_features_locales" (
	"text" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "pp_model_features_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "partners_page_partnership_models_models" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "partners_page_partnership_models_models_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"ideal_for" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "partners_page_partnership_models_models_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "partners_page_process_steps" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar
);

CREATE TABLE IF NOT EXISTS "partners_page_process_steps_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "partners_page_process_steps_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "partners_page_credentials_downloads" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"requires_contact" boolean
);

CREATE TABLE IF NOT EXISTS "partners_page_credentials_downloads_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "partners_page_credentials_downloads_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "partners_page_credentials_certifications" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar
);

CREATE TABLE IF NOT EXISTS "partners_page_stats_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"number" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "partners_page_stats_items_locales" (
	"label" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "partners_page_stats_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "partners_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_partners_page_hero_height",
	"hero_overlayStyle" "enum_partners_page_hero_overlay_style",
	"hero_cta_link" varchar,
	"value_proposition_enabled" boolean,
	"partnership_models_enabled" boolean,
	"partnershipModels_layout" "enum_partners_page_partnership_models_layout",
	"process_enabled" boolean,
	"credentials_enabled" boolean,
	"stats_enabled" boolean,
	"stats_backgroundColor" "enum_partners_page_stats_background_color",
	"testimonial_highlight_enabled" boolean,
	"testimonial_highlight_author_name" varchar,
	"testimonial_highlight_author_role" varchar,
	"testimonial_highlight_company_name" varchar,
	"testimonial_highlight_link_url" varchar,
	"inquiry_cta_enabled" boolean,
	"inquiry_cta_primary_button_link" varchar,
	"inquiry_cta_secondary_button_link" varchar,
	"inquiry_cta_contact_email" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "partners_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"hero_cta_text" varchar,
	"value_proposition_eyebrow" varchar,
	"value_proposition_title" varchar,
	"value_proposition_description" varchar,
	"partnership_models_eyebrow" varchar,
	"partnership_models_title" varchar,
	"partnership_models_description" varchar,
	"process_eyebrow" varchar,
	"process_title" varchar,
	"credentials_eyebrow" varchar,
	"credentials_title" varchar,
	"credentials_description" varchar,
	"stats_eyebrow" varchar,
	"stats_title" varchar,
	"testimonial_highlight_quote" varchar,
	"testimonial_highlight_link_text" varchar,
	"inquiry_cta_title" varchar,
	"inquiry_cta_description" varchar,
	"inquiry_cta_primary_button_text" varchar,
	"inquiry_cta_secondary_button_text" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "partners_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "partners_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "piq_company_type_opts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "piq_company_type_opts_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "piq_company_type_opts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "piq_role_opts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "piq_role_opts_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "piq_role_opts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "piq_volume_opts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "piq_volume_opts_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "piq_volume_opts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "piq_dest_opts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "piq_dest_opts_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "piq_dest_opts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "piq_svc_opts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "piq_svc_opts_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "piq_svc_opts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "piq_partner_type_opts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "piq_partner_type_opts_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "piq_partner_type_opts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "piq_hear_opts" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "piq_hear_opts_locales" (
	"label" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "piq_hear_opts_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "piq_sidebar_benefits" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"icon" varchar
);

CREATE TABLE IF NOT EXISTS "piq_sidebar_benefits_locales" (
	"title" varchar NOT NULL,
	"description" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "piq_sidebar_benefits_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "partner_inquiry_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_height" "enum_partner_inquiry_page_hero_height",
	"form_company_fields_company_name_required" boolean,
	"form_company_fields_website_required" boolean,
	"form_company_fields_country_required" boolean,
	"form_company_fields_company_type_required" boolean,
	"form_contact_fields_contact_name_required" boolean,
	"form_contact_fields_email_required" boolean,
	"form_contact_fields_phone_required" boolean,
	"form_contact_fields_role_required" boolean,
	"form_business_fields_annual_volume_required" boolean,
	"form_business_fields_destinations_of_interest_required" boolean,
	"form_business_fields_services_of_interest_required" boolean,
	"form_additional_fields_partnership_type_required" boolean,
	"form_additional_fields_message_required" boolean,
	"sidebar_enabled" boolean,
	"sidebar_contact_email" varchar,
	"sidebar_contact_phone" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "partner_inquiry_page_locales" (
	"hero_title" varchar,
	"hero_subtitle" varchar,
	"form_title" varchar,
	"form_description" varchar,
	"form_company_fields_company_name_label" varchar,
	"form_company_fields_company_name_placeholder" varchar,
	"form_company_fields_website_label" varchar,
	"form_company_fields_website_placeholder" varchar,
	"form_company_fields_country_label" varchar,
	"form_company_fields_country_placeholder" varchar,
	"form_company_fields_company_type_label" varchar,
	"form_contact_fields_contact_name_label" varchar,
	"form_contact_fields_contact_name_placeholder" varchar,
	"form_contact_fields_email_label" varchar,
	"form_contact_fields_email_placeholder" varchar,
	"form_contact_fields_phone_label" varchar,
	"form_contact_fields_phone_placeholder" varchar,
	"form_contact_fields_role_label" varchar,
	"form_business_fields_annual_volume_label" varchar,
	"form_business_fields_destinations_of_interest_label" varchar,
	"form_business_fields_services_of_interest_label" varchar,
	"form_additional_fields_partnership_type_label" varchar,
	"form_additional_fields_message_label" varchar,
	"form_additional_fields_message_placeholder" varchar,
	"form_additional_fields_how_did_you_hear_label" varchar,
	"form_submit_button_text" varchar,
	"form_submit_button_loading_text" varchar,
	"form_success_message_title" varchar,
	"form_success_message_description" varchar,
	"sidebar_title" varchar,
	"sidebar_contact_title" varchar,
	"sidebar_contact_response_time" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_meta_keywords" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "partner_inquiry_page_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "partner_inquiry_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

DO $$ BEGIN
 ALTER TABLE "countries_gallery" ADD CONSTRAINT "countries_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_locales" ADD CONSTRAINT "countries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_rels" ADD CONSTRAINT "countries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_rels" ADD CONSTRAINT "countries_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_gallery" ADD CONSTRAINT "cities_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_highlights" ADD CONSTRAINT "cities_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_locales" ADD CONSTRAINT "cities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_rels" ADD CONSTRAINT "cities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_rels" ADD CONSTRAINT "cities_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_rels" ADD CONSTRAINT "cities_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attractions_gallery" ADD CONSTRAINT "attractions_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attractions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attractions_tips" ADD CONSTRAINT "attractions_tips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attractions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attractions_locales" ADD CONSTRAINT "attractions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attractions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attractions_rels" ADD CONSTRAINT "attractions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."attractions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attractions_rels" ADD CONSTRAINT "attractions_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attractions_rels" ADD CONSTRAINT "attractions_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_travel_style" ADD CONSTRAINT "itineraries_travel_style_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_days_activities" ADD CONSTRAINT "itineraries_days_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_days"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_days" ADD CONSTRAINT "itineraries_days_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_intro_essence" ADD CONSTRAINT "itineraries_blocks_intro_essence_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_intro"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_intro_essence_locales" ADD CONSTRAINT "itineraries_blocks_intro_essence_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_intro_essence"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_intro" ADD CONSTRAINT "itineraries_blocks_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_intro_locales" ADD CONSTRAINT "itineraries_blocks_intro_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_intro"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_chapter_moments" ADD CONSTRAINT "itineraries_blocks_chapter_moments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_chapter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_chapter_moments_locales" ADD CONSTRAINT "itineraries_blocks_chapter_moments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_chapter_moments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_chapter" ADD CONSTRAINT "itineraries_blocks_chapter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_chapter_locales" ADD CONSTRAINT "itineraries_blocks_chapter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_chapter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_experience_experiences" ADD CONSTRAINT "itineraries_blocks_experience_experiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_experience"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_experience_experiences_locales" ADD CONSTRAINT "itineraries_blocks_experience_experiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_experience_experiences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_experience" ADD CONSTRAINT "itineraries_blocks_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_experience_locales" ADD CONSTRAINT "itineraries_blocks_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_experience"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_interlude" ADD CONSTRAINT "itineraries_blocks_interlude_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_interlude_locales" ADD CONSTRAINT "itineraries_blocks_interlude_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_interlude"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_gallery_images" ADD CONSTRAINT "itineraries_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_gallery_images_locales" ADD CONSTRAINT "itineraries_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_gallery" ADD CONSTRAINT "itineraries_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_gallery_locales" ADD CONSTRAINT "itineraries_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_essentials_categories_items" ADD CONSTRAINT "itineraries_blocks_essentials_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_essentials_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_essentials_categories_items_locales" ADD CONSTRAINT "itineraries_blocks_essentials_categories_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_essentials_categories_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_essentials_categories" ADD CONSTRAINT "itineraries_blocks_essentials_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_essentials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_essentials_categories_locales" ADD CONSTRAINT "itineraries_blocks_essentials_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_essentials_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_essentials" ADD CONSTRAINT "itineraries_blocks_essentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_blocks_essentials_locales" ADD CONSTRAINT "itineraries_blocks_essentials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_blocks_essentials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_packing_list" ADD CONSTRAINT "itineraries_packing_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_locales" ADD CONSTRAINT "itineraries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_rels" ADD CONSTRAINT "itineraries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_rels" ADD CONSTRAINT "itineraries_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_rels" ADD CONSTRAINT "itineraries_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_rels" ADD CONSTRAINT "itineraries_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_rels" ADD CONSTRAINT "itineraries_rels_attractions_fk" FOREIGN KEY ("attractions_id") REFERENCES "public"."attractions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_rels" ADD CONSTRAINT "itineraries_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_content_blocks" ADD CONSTRAINT "pages_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_content_blocks_locales" ADD CONSTRAINT "pages_content_blocks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content_blocks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_delivery_approach" ADD CONSTRAINT "case_studies_delivery_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_responsible_practices" ADD CONSTRAINT "case_studies_responsible_practices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_measurable_results" ADD CONSTRAINT "case_studies_measurable_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_measurable_results_locales" ADD CONSTRAINT "case_studies_measurable_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_measurable_results"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_locales" ADD CONSTRAINT "case_studies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_itineraries_fk" FOREIGN KEY ("itineraries_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_inquiries_destinations_of_interest" ADD CONSTRAINT "partner_inquiries_destinations_of_interest_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_inquiries_services_of_interest" ADD CONSTRAINT "partner_inquiries_services_of_interest_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_inquiries_rels" ADD CONSTRAINT "partner_inquiries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partner_inquiries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_inquiries_rels" ADD CONSTRAINT "partner_inquiries_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_header_navigation_children" ADD CONSTRAINT "site_header_navigation_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header_navigation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_header_navigation_children_locales" ADD CONSTRAINT "site_header_navigation_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header_navigation_children"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_header_navigation" ADD CONSTRAINT "site_header_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_header_navigation_locales" ADD CONSTRAINT "site_header_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header_navigation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_header_locales" ADD CONSTRAINT "site_header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_header"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_header_rels" ADD CONSTRAINT "site_header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_header"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_header_rels" ADD CONSTRAINT "site_header_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_footer_columns_links" ADD CONSTRAINT "site_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_footer_columns_links_locales" ADD CONSTRAINT "site_footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_footer_columns" ADD CONSTRAINT "site_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_footer_columns_locales" ADD CONSTRAINT "site_footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_footer_social_links" ADD CONSTRAINT "site_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_footer_bottom_bar_legal_links" ADD CONSTRAINT "site_footer_bottom_bar_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_footer_bottom_bar_legal_links_locales" ADD CONSTRAINT "site_footer_bottom_bar_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer_bottom_bar_legal_links"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_footer_locales" ADD CONSTRAINT "site_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_footer_rels" ADD CONSTRAINT "site_footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_footer_rels" ADD CONSTRAINT "site_footer_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_testimonials_items" ADD CONSTRAINT "home_page_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_testimonials_items_locales" ADD CONSTRAINT "home_page_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_stats_items" ADD CONSTRAINT "home_page_b2b_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_stats_items_locales" ADD CONSTRAINT "home_page_b2b_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_b2b_stats_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_value_proposition_highlights" ADD CONSTRAINT "home_page_b2b_value_proposition_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_value_proposition_highlights_locales" ADD CONSTRAINT "home_page_b2b_value_proposition_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_b2b_value_proposition_highlights"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_services_overview_services_features" ADD CONSTRAINT "home_page_b2b_services_overview_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_b2b_services_overview_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_services_overview_services_features_locales" ADD CONSTRAINT "home_page_b2b_services_overview_services_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_b2b_services_overview_services_features"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_services_overview_services" ADD CONSTRAINT "home_page_b2b_services_overview_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_services_overview_services_locales" ADD CONSTRAINT "home_page_b2b_services_overview_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_b2b_services_overview_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_credentials_items" ADD CONSTRAINT "home_page_b2b_credentials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_credentials_items_locales" ADD CONSTRAINT "home_page_b2b_credentials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_b2b_credentials_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_partner_showcase_partners" ADD CONSTRAINT "home_page_b2b_partner_showcase_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_partner_showcase_partners_locales" ADD CONSTRAINT "home_page_b2b_partner_showcase_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_b2b_partner_showcase_partners"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_cta_stats" ADD CONSTRAINT "home_page_b2b_cta_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_b2b_cta_stats_locales" ADD CONSTRAINT "home_page_b2b_cta_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_b2b_cta_stats"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_itineraries_fk" FOREIGN KEY ("itineraries_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "destinations_page_locales" ADD CONSTRAINT "destinations_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."destinations_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "destinations_page_rels" ADD CONSTRAINT "destinations_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."destinations_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "destinations_page_rels" ADD CONSTRAINT "destinations_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "destinations_page_rels" ADD CONSTRAINT "destinations_page_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_page_locales" ADD CONSTRAINT "blog_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_page_rels" ADD CONSTRAINT "blog_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_page_rels" ADD CONSTRAINT "blog_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_values_items" ADD CONSTRAINT "about_page_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_values_items_locales" ADD CONSTRAINT "about_page_values_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_values_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_why_choose_items" ADD CONSTRAINT "about_page_why_choose_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_why_choose_items_locales" ADD CONSTRAINT "about_page_why_choose_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_why_choose_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_team_members" ADD CONSTRAINT "about_page_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_team_members_locales" ADD CONSTRAINT "about_page_team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_team_members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_stats_items" ADD CONSTRAINT "about_page_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_stats_items_locales" ADD CONSTRAINT "about_page_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_stats_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "contact_page_social_links" ADD CONSTRAINT "contact_page_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "contact_page_rels" ADD CONSTRAINT "contact_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "contact_page_rels" ADD CONSTRAINT "contact_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "faq_page_locales" ADD CONSTRAINT "faq_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "faq_page_rels" ADD CONSTRAINT "faq_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faq_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "faq_page_rels" ADD CONSTRAINT "faq_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_page_locales" ADD CONSTRAINT "itineraries_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itineraries_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_page_rels" ADD CONSTRAINT "itineraries_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."itineraries_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itineraries_page_rels" ADD CONSTRAINT "itineraries_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attractions_page_locales" ADD CONSTRAINT "attractions_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attractions_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attractions_page_rels" ADD CONSTRAINT "attractions_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."attractions_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attractions_page_rels" ADD CONSTRAINT "attractions_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_page_listing_sort_options" ADD CONSTRAINT "cities_page_listing_sort_options_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cities_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_page_locales" ADD CONSTRAINT "cities_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_page_rels" ADD CONSTRAINT "cities_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cities_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_page_rels" ADD CONSTRAINT "cities_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "cities_page_rels" ADD CONSTRAINT "cities_page_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_page_listing_regions" ADD CONSTRAINT "countries_page_listing_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_page_listing_regions_locales" ADD CONSTRAINT "countries_page_listing_regions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries_page_listing_regions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_page_regions_overview_items" ADD CONSTRAINT "countries_page_regions_overview_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_page_regions_overview_items_locales" ADD CONSTRAINT "countries_page_regions_overview_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries_page_regions_overview_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_page_locales" ADD CONSTRAINT "countries_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_page_rels" ADD CONSTRAINT "countries_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."countries_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_page_rels" ADD CONSTRAINT "countries_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "countries_page_rels" ADD CONSTRAINT "countries_page_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attraction_detail_config_category_labels" ADD CONSTRAINT "attraction_detail_config_category_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attraction_detail_config"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attraction_detail_config_category_labels_locales" ADD CONSTRAINT "attraction_detail_config_category_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attraction_detail_config_category_labels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "attraction_detail_config_locales" ADD CONSTRAINT "attraction_detail_config_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."attraction_detail_config"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "city_detail_config_category_labels" ADD CONSTRAINT "city_detail_config_category_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."city_detail_config"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "city_detail_config_category_labels_locales" ADD CONSTRAINT "city_detail_config_category_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."city_detail_config_category_labels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "city_detail_config_locales" ADD CONSTRAINT "city_detail_config_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."city_detail_config"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "country_detail_config_continent_labels" ADD CONSTRAINT "country_detail_config_continent_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."country_detail_config"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "country_detail_config_continent_labels_locales" ADD CONSTRAINT "country_detail_config_continent_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."country_detail_config_continent_labels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "country_detail_config_locales" ADD CONSTRAINT "country_detail_config_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."country_detail_config"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itinerary_detail_config_difficulty_labels" ADD CONSTRAINT "itinerary_detail_config_difficulty_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itinerary_detail_config"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itinerary_detail_config_difficulty_labels_locales" ADD CONSTRAINT "itinerary_detail_config_difficulty_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itinerary_detail_config_difficulty_labels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itinerary_detail_config_travel_style_labels" ADD CONSTRAINT "itinerary_detail_config_travel_style_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itinerary_detail_config"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itinerary_detail_config_travel_style_labels_locales" ADD CONSTRAINT "itinerary_detail_config_travel_style_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itinerary_detail_config_travel_style_labels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itinerary_detail_config_packing_category_labels" ADD CONSTRAINT "itinerary_detail_config_packing_category_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itinerary_detail_config"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itinerary_detail_config_packing_category_labels_locales" ADD CONSTRAINT "itinerary_detail_config_packing_category_labels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itinerary_detail_config_packing_category_labels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "itinerary_detail_config_locales" ADD CONSTRAINT "itinerary_detail_config_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."itinerary_detail_config"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_services_items_features" ADD CONSTRAINT "expertise_page_services_items_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_services_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_services_items_features_locales" ADD CONSTRAINT "expertise_page_services_items_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_services_items_features"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_services_items" ADD CONSTRAINT "expertise_page_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_services_items_locales" ADD CONSTRAINT "expertise_page_services_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_services_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_coverage_regions_highlights" ADD CONSTRAINT "expertise_page_coverage_regions_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_coverage_regions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_coverage_regions_highlights_locales" ADD CONSTRAINT "expertise_page_coverage_regions_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_coverage_regions_highlights"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_coverage_regions_key_attractions" ADD CONSTRAINT "expertise_page_coverage_regions_key_attractions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_coverage_regions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_coverage_regions_key_attractions_locales" ADD CONSTRAINT "expertise_page_coverage_regions_key_attractions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_coverage_regions_key_attractions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_coverage_regions_travel_styles" ADD CONSTRAINT "expertise_page_coverage_regions_travel_styles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_coverage_regions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_coverage_regions_travel_styles_locales" ADD CONSTRAINT "expertise_page_coverage_regions_travel_styles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_coverage_regions_travel_styles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_coverage_regions_languages" ADD CONSTRAINT "expertise_page_coverage_regions_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_coverage_regions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_coverage_regions_languages_locales" ADD CONSTRAINT "expertise_page_coverage_regions_languages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_coverage_regions_languages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_coverage_regions" ADD CONSTRAINT "expertise_page_coverage_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_coverage_regions_locales" ADD CONSTRAINT "expertise_page_coverage_regions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_coverage_regions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_capacity_items" ADD CONSTRAINT "expertise_page_capacity_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_capacity_items_locales" ADD CONSTRAINT "expertise_page_capacity_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_capacity_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_quality_items" ADD CONSTRAINT "expertise_page_quality_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_quality_items_locales" ADD CONSTRAINT "expertise_page_quality_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_quality_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_why_us_items_details" ADD CONSTRAINT "expertise_page_why_us_items_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_why_us_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_why_us_items_details_locales" ADD CONSTRAINT "expertise_page_why_us_items_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_why_us_items_details"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_why_us_items" ADD CONSTRAINT "expertise_page_why_us_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_why_us_items_locales" ADD CONSTRAINT "expertise_page_why_us_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page_why_us_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_locales" ADD CONSTRAINT "expertise_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expertise_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_rels" ADD CONSTRAINT "expertise_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."expertise_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "expertise_page_rels" ADD CONSTRAINT "expertise_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_certifications_items" ADD CONSTRAINT "sustainability_page_certifications_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_certifications_items_locales" ADD CONSTRAINT "sustainability_page_certifications_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_certifications_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_initiatives_items_op_approach" ADD CONSTRAINT "sustainability_page_initiatives_items_op_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_initiatives_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_initiatives_items_op_approach_locales" ADD CONSTRAINT "sustainability_page_initiatives_items_op_approach_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_initiatives_items_op_approach"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_initiatives_items" ADD CONSTRAINT "sustainability_page_initiatives_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_initiatives_items_locales" ADD CONSTRAINT "sustainability_page_initiatives_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_initiatives_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_op_standards_practices_details" ADD CONSTRAINT "sustainability_page_op_standards_practices_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_op_standards_practices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_op_standards_practices_details_locales" ADD CONSTRAINT "sustainability_page_op_standards_practices_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_op_standards_practices_details"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_op_standards_practices" ADD CONSTRAINT "sustainability_page_op_standards_practices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_op_standards_practices_locales" ADD CONSTRAINT "sustainability_page_op_standards_practices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_op_standards_practices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_practices_categories_practices" ADD CONSTRAINT "sustainability_page_practices_categories_practices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_practices_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_practices_categories_practices_locales" ADD CONSTRAINT "sustainability_page_practices_categories_practices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_practices_categories_practices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_practices_categories" ADD CONSTRAINT "sustainability_page_practices_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_practices_categories_locales" ADD CONSTRAINT "sustainability_page_practices_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_practices_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_supplier_standards_criteria" ADD CONSTRAINT "sustainability_page_supplier_standards_criteria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_supplier_standards_criteria_locales" ADD CONSTRAINT "sustainability_page_supplier_standards_criteria_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_supplier_standards_criteria"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_impact_items_measurement_method" ADD CONSTRAINT "sustainability_page_impact_items_measurement_method_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_impact_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_impact_items_measurement_method_locales" ADD CONSTRAINT "sustainability_page_impact_items_measurement_method_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_impact_items_measurement_method"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_impact_items" ADD CONSTRAINT "sustainability_page_impact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_impact_items_locales" ADD CONSTRAINT "sustainability_page_impact_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page_impact_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_locales" ADD CONSTRAINT "sustainability_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_rels" ADD CONSTRAINT "sustainability_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sustainability_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sustainability_page_rels" ADD CONSTRAINT "sustainability_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_partner_logos_logos" ADD CONSTRAINT "case_studies_page_partner_logos_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_case_studies_items_metrics" ADD CONSTRAINT "case_studies_page_case_studies_items_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page_case_studies_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_case_studies_items_metrics_locales" ADD CONSTRAINT "case_studies_page_case_studies_items_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page_case_studies_items_metrics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_case_studies_items" ADD CONSTRAINT "case_studies_page_case_studies_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_case_studies_items_locales" ADD CONSTRAINT "case_studies_page_case_studies_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page_case_studies_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_partner_statements_statements" ADD CONSTRAINT "case_studies_page_partner_statements_statements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_partner_statements_statements_locales" ADD CONSTRAINT "case_studies_page_partner_statements_statements_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page_partner_statements_statements"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_testimonials_items" ADD CONSTRAINT "case_studies_page_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_testimonials_items_locales" ADD CONSTRAINT "case_studies_page_testimonials_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page_testimonials_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_partnership_types_items" ADD CONSTRAINT "case_studies_page_partnership_types_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_partnership_types_items_locales" ADD CONSTRAINT "case_studies_page_partnership_types_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page_partnership_types_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_locales" ADD CONSTRAINT "case_studies_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_rels" ADD CONSTRAINT "case_studies_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "case_studies_page_rels" ADD CONSTRAINT "case_studies_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_value_proposition_benefits" ADD CONSTRAINT "partners_page_value_proposition_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_value_proposition_benefits_locales" ADD CONSTRAINT "partners_page_value_proposition_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page_value_proposition_benefits"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pp_model_features" ADD CONSTRAINT "pp_model_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page_partnership_models_models"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pp_model_features_locales" ADD CONSTRAINT "pp_model_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pp_model_features"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_partnership_models_models" ADD CONSTRAINT "partners_page_partnership_models_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_partnership_models_models_locales" ADD CONSTRAINT "partners_page_partnership_models_models_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page_partnership_models_models"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_process_steps" ADD CONSTRAINT "partners_page_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_process_steps_locales" ADD CONSTRAINT "partners_page_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page_process_steps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_credentials_downloads" ADD CONSTRAINT "partners_page_credentials_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_credentials_downloads_locales" ADD CONSTRAINT "partners_page_credentials_downloads_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page_credentials_downloads"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_credentials_certifications" ADD CONSTRAINT "partners_page_credentials_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_stats_items" ADD CONSTRAINT "partners_page_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_stats_items_locales" ADD CONSTRAINT "partners_page_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page_stats_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_locales" ADD CONSTRAINT "partners_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_rels" ADD CONSTRAINT "partners_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partners_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partners_page_rels" ADD CONSTRAINT "partners_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_company_type_opts" ADD CONSTRAINT "piq_company_type_opts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiry_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_company_type_opts_locales" ADD CONSTRAINT "piq_company_type_opts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piq_company_type_opts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_role_opts" ADD CONSTRAINT "piq_role_opts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiry_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_role_opts_locales" ADD CONSTRAINT "piq_role_opts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piq_role_opts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_volume_opts" ADD CONSTRAINT "piq_volume_opts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiry_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_volume_opts_locales" ADD CONSTRAINT "piq_volume_opts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piq_volume_opts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_dest_opts" ADD CONSTRAINT "piq_dest_opts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiry_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_dest_opts_locales" ADD CONSTRAINT "piq_dest_opts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piq_dest_opts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_svc_opts" ADD CONSTRAINT "piq_svc_opts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiry_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_svc_opts_locales" ADD CONSTRAINT "piq_svc_opts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piq_svc_opts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_partner_type_opts" ADD CONSTRAINT "piq_partner_type_opts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiry_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_partner_type_opts_locales" ADD CONSTRAINT "piq_partner_type_opts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piq_partner_type_opts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_hear_opts" ADD CONSTRAINT "piq_hear_opts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiry_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_hear_opts_locales" ADD CONSTRAINT "piq_hear_opts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piq_hear_opts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_sidebar_benefits" ADD CONSTRAINT "piq_sidebar_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiry_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "piq_sidebar_benefits_locales" ADD CONSTRAINT "piq_sidebar_benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."piq_sidebar_benefits"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_inquiry_page_locales" ADD CONSTRAINT "partner_inquiry_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partner_inquiry_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_inquiry_page_rels" ADD CONSTRAINT "partner_inquiry_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partner_inquiry_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_inquiry_page_rels" ADD CONSTRAINT "partner_inquiry_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
CREATE INDEX IF NOT EXISTS "countries_gallery_order_idx" ON "countries_gallery" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "countries_gallery_parent_id_idx" ON "countries_gallery" USING btree ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "countries_slug_idx" ON "countries" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "countries_created_at_idx" ON "countries" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "countries_name_idx" ON "countries_locales" USING btree ("name");
CREATE INDEX IF NOT EXISTS "countries_rels_order_idx" ON "countries_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "countries_rels_parent_idx" ON "countries_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "countries_rels_path_idx" ON "countries_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "countries_rels_media_id_idx" ON "countries_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "cities_gallery_order_idx" ON "cities_gallery" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "cities_gallery_parent_id_idx" ON "cities_gallery" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "cities_highlights_order_idx" ON "cities_highlights" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "cities_highlights_parent_id_idx" ON "cities_highlights" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "cities_highlights_locale_idx" ON "cities_highlights" USING btree ("_locale");
CREATE UNIQUE INDEX IF NOT EXISTS "cities_slug_idx" ON "cities" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "cities_created_at_idx" ON "cities" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "cities_name_idx" ON "cities_locales" USING btree ("name");
CREATE INDEX IF NOT EXISTS "cities_rels_order_idx" ON "cities_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "cities_rels_parent_idx" ON "cities_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "cities_rels_path_idx" ON "cities_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "cities_rels_countries_id_idx" ON "cities_rels" USING btree ("countries_id");
CREATE INDEX IF NOT EXISTS "cities_rels_media_id_idx" ON "cities_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "attractions_gallery_order_idx" ON "attractions_gallery" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "attractions_gallery_parent_id_idx" ON "attractions_gallery" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "attractions_tips_order_idx" ON "attractions_tips" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "attractions_tips_parent_id_idx" ON "attractions_tips" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "attractions_tips_locale_idx" ON "attractions_tips" USING btree ("_locale");
CREATE UNIQUE INDEX IF NOT EXISTS "attractions_slug_idx" ON "attractions" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "attractions_created_at_idx" ON "attractions" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "attractions_name_idx" ON "attractions_locales" USING btree ("name");
CREATE INDEX IF NOT EXISTS "attractions_rels_order_idx" ON "attractions_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "attractions_rels_parent_idx" ON "attractions_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "attractions_rels_path_idx" ON "attractions_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "attractions_rels_cities_id_idx" ON "attractions_rels" USING btree ("cities_id");
CREATE INDEX IF NOT EXISTS "attractions_rels_media_id_idx" ON "attractions_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "itineraries_travel_style_order_idx" ON "itineraries_travel_style" USING btree ("order");
CREATE INDEX IF NOT EXISTS "itineraries_travel_style_parent_idx" ON "itineraries_travel_style" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_days_activities_order_idx" ON "itineraries_days_activities" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_days_activities_parent_id_idx" ON "itineraries_days_activities" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_days_activities_locale_idx" ON "itineraries_days_activities" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_days_order_idx" ON "itineraries_days" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_days_parent_id_idx" ON "itineraries_days" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_days_locale_idx" ON "itineraries_days" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_intro_essence_order_idx" ON "itineraries_blocks_intro_essence" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_intro_essence_parent_id_idx" ON "itineraries_blocks_intro_essence" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_intro_essence_locale_idx" ON "itineraries_blocks_intro_essence" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_intro_order_idx" ON "itineraries_blocks_intro" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_intro_parent_id_idx" ON "itineraries_blocks_intro" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_intro_path_idx" ON "itineraries_blocks_intro" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_intro_locale_idx" ON "itineraries_blocks_intro" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_chapter_moments_order_idx" ON "itineraries_blocks_chapter_moments" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_chapter_moments_parent_id_idx" ON "itineraries_blocks_chapter_moments" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_chapter_moments_locale_idx" ON "itineraries_blocks_chapter_moments" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_chapter_order_idx" ON "itineraries_blocks_chapter" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_chapter_parent_id_idx" ON "itineraries_blocks_chapter" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_chapter_path_idx" ON "itineraries_blocks_chapter" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_chapter_locale_idx" ON "itineraries_blocks_chapter" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_experience_experiences_order_idx" ON "itineraries_blocks_experience_experiences" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_experience_experiences_parent_id_idx" ON "itineraries_blocks_experience_experiences" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_experience_experiences_locale_idx" ON "itineraries_blocks_experience_experiences" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_experience_order_idx" ON "itineraries_blocks_experience" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_experience_parent_id_idx" ON "itineraries_blocks_experience" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_experience_path_idx" ON "itineraries_blocks_experience" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_experience_locale_idx" ON "itineraries_blocks_experience" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_interlude_order_idx" ON "itineraries_blocks_interlude" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_interlude_parent_id_idx" ON "itineraries_blocks_interlude" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_interlude_path_idx" ON "itineraries_blocks_interlude" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_interlude_locale_idx" ON "itineraries_blocks_interlude" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_gallery_images_order_idx" ON "itineraries_blocks_gallery_images" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_gallery_images_parent_id_idx" ON "itineraries_blocks_gallery_images" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_gallery_images_locale_idx" ON "itineraries_blocks_gallery_images" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_gallery_order_idx" ON "itineraries_blocks_gallery" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_gallery_parent_id_idx" ON "itineraries_blocks_gallery" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_gallery_path_idx" ON "itineraries_blocks_gallery" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_gallery_locale_idx" ON "itineraries_blocks_gallery" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_essentials_categories_items_order_idx" ON "itineraries_blocks_essentials_categories_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_essentials_categories_items_parent_id_idx" ON "itineraries_blocks_essentials_categories_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_essentials_categories_items_locale_idx" ON "itineraries_blocks_essentials_categories_items" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_essentials_categories_order_idx" ON "itineraries_blocks_essentials_categories" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_essentials_categories_parent_id_idx" ON "itineraries_blocks_essentials_categories" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_essentials_categories_locale_idx" ON "itineraries_blocks_essentials_categories" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_essentials_order_idx" ON "itineraries_blocks_essentials" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_essentials_parent_id_idx" ON "itineraries_blocks_essentials" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_essentials_path_idx" ON "itineraries_blocks_essentials" USING btree ("_path");
CREATE INDEX IF NOT EXISTS "itineraries_blocks_essentials_locale_idx" ON "itineraries_blocks_essentials" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "itineraries_packing_list_order_idx" ON "itineraries_packing_list" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itineraries_packing_list_parent_id_idx" ON "itineraries_packing_list" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_packing_list_locale_idx" ON "itineraries_packing_list" USING btree ("_locale");
CREATE UNIQUE INDEX IF NOT EXISTS "itineraries_slug_idx" ON "itineraries" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "itineraries_created_at_idx" ON "itineraries" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "itineraries_title_idx" ON "itineraries_locales" USING btree ("title");
CREATE INDEX IF NOT EXISTS "itineraries_rels_order_idx" ON "itineraries_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "itineraries_rels_parent_idx" ON "itineraries_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_rels_path_idx" ON "itineraries_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "itineraries_rels_media_id_idx" ON "itineraries_rels" USING btree ("media_id","locale");
CREATE INDEX IF NOT EXISTS "itineraries_rels_countries_id_idx" ON "itineraries_rels" USING btree ("countries_id","locale");
CREATE INDEX IF NOT EXISTS "itineraries_rels_cities_id_idx" ON "itineraries_rels" USING btree ("cities_id","locale");
CREATE INDEX IF NOT EXISTS "itineraries_rels_attractions_id_idx" ON "itineraries_rels" USING btree ("attractions_id","locale");
CREATE INDEX IF NOT EXISTS "itineraries_rels_users_id_idx" ON "itineraries_rels" USING btree ("users_id","locale");
CREATE INDEX IF NOT EXISTS "itineraries_rels_locale_idx" ON "itineraries_rels" USING btree ("locale");
CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "blog_posts_title_idx" ON "blog_posts_locales" USING btree ("title");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_media_id_idx" ON "blog_posts_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "blog_posts_rels_users_id_idx" ON "blog_posts_rels" USING btree ("users_id");
CREATE INDEX IF NOT EXISTS "pages_content_blocks_order_idx" ON "pages_content_blocks" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_content_blocks_parent_id_idx" ON "pages_content_blocks" USING btree ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "pages_title_idx" ON "pages_locales" USING btree ("title");
CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "case_studies_delivery_approach_order_idx" ON "case_studies_delivery_approach" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "case_studies_delivery_approach_parent_id_idx" ON "case_studies_delivery_approach" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_delivery_approach_locale_idx" ON "case_studies_delivery_approach" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "case_studies_responsible_practices_order_idx" ON "case_studies_responsible_practices" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "case_studies_responsible_practices_parent_id_idx" ON "case_studies_responsible_practices" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_responsible_practices_locale_idx" ON "case_studies_responsible_practices" USING btree ("_locale");
CREATE INDEX IF NOT EXISTS "case_studies_measurable_results_order_idx" ON "case_studies_measurable_results" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "case_studies_measurable_results_parent_id_idx" ON "case_studies_measurable_results" USING btree ("_parent_id");
CREATE UNIQUE INDEX IF NOT EXISTS "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "case_studies_title_idx" ON "case_studies_locales" USING btree ("title");
CREATE INDEX IF NOT EXISTS "case_studies_rels_order_idx" ON "case_studies_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "case_studies_rels_parent_idx" ON "case_studies_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_rels_path_idx" ON "case_studies_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "case_studies_rels_countries_id_idx" ON "case_studies_rels" USING btree ("countries_id");
CREATE INDEX IF NOT EXISTS "case_studies_rels_media_id_idx" ON "case_studies_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "case_studies_rels_case_studies_id_idx" ON "case_studies_rels" USING btree ("case_studies_id");
CREATE INDEX IF NOT EXISTS "case_studies_rels_itineraries_id_idx" ON "case_studies_rels" USING btree ("itineraries_id");
CREATE INDEX IF NOT EXISTS "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "partner_inquiries_destinations_of_interest_order_idx" ON "partner_inquiries_destinations_of_interest" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "partner_inquiries_destinations_of_interest_parent_id_idx" ON "partner_inquiries_destinations_of_interest" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "partner_inquiries_services_of_interest_order_idx" ON "partner_inquiries_services_of_interest" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "partner_inquiries_services_of_interest_parent_id_idx" ON "partner_inquiries_services_of_interest" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "partner_inquiries_created_at_idx" ON "partner_inquiries" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "partner_inquiries_rels_order_idx" ON "partner_inquiries_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "partner_inquiries_rels_parent_idx" ON "partner_inquiries_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "partner_inquiries_rels_path_idx" ON "partner_inquiries_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "partner_inquiries_rels_users_id_idx" ON "partner_inquiries_rels" USING btree ("users_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "site_header_navigation_children_order_idx" ON "site_header_navigation_children" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "site_header_navigation_children_parent_id_idx" ON "site_header_navigation_children" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_header_navigation_order_idx" ON "site_header_navigation" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "site_header_navigation_parent_id_idx" ON "site_header_navigation" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_header_rels_order_idx" ON "site_header_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "site_header_rels_parent_idx" ON "site_header_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "site_header_rels_path_idx" ON "site_header_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "site_header_rels_media_id_idx" ON "site_header_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "site_footer_columns_links_order_idx" ON "site_footer_columns_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "site_footer_columns_links_parent_id_idx" ON "site_footer_columns_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_footer_columns_order_idx" ON "site_footer_columns" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "site_footer_columns_parent_id_idx" ON "site_footer_columns" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_footer_social_links_order_idx" ON "site_footer_social_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "site_footer_social_links_parent_id_idx" ON "site_footer_social_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_footer_bottom_bar_legal_links_order_idx" ON "site_footer_bottom_bar_legal_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "site_footer_bottom_bar_legal_links_parent_id_idx" ON "site_footer_bottom_bar_legal_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_footer_rels_order_idx" ON "site_footer_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "site_footer_rels_parent_idx" ON "site_footer_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "site_footer_rels_path_idx" ON "site_footer_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "site_footer_rels_media_id_idx" ON "site_footer_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "home_page_testimonials_items_order_idx" ON "home_page_testimonials_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "home_page_testimonials_items_parent_id_idx" ON "home_page_testimonials_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "home_page_b2b_stats_items_order_idx" ON "home_page_b2b_stats_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "home_page_b2b_stats_items_parent_id_idx" ON "home_page_b2b_stats_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "home_page_b2b_value_proposition_highlights_order_idx" ON "home_page_b2b_value_proposition_highlights" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "home_page_b2b_value_proposition_highlights_parent_id_idx" ON "home_page_b2b_value_proposition_highlights" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "home_page_b2b_services_overview_services_features_order_idx" ON "home_page_b2b_services_overview_services_features" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "home_page_b2b_services_overview_services_features_parent_id_idx" ON "home_page_b2b_services_overview_services_features" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "home_page_b2b_services_overview_services_order_idx" ON "home_page_b2b_services_overview_services" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "home_page_b2b_services_overview_services_parent_id_idx" ON "home_page_b2b_services_overview_services" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "home_page_b2b_credentials_items_order_idx" ON "home_page_b2b_credentials_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "home_page_b2b_credentials_items_parent_id_idx" ON "home_page_b2b_credentials_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "home_page_b2b_partner_showcase_partners_order_idx" ON "home_page_b2b_partner_showcase_partners" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "home_page_b2b_partner_showcase_partners_parent_id_idx" ON "home_page_b2b_partner_showcase_partners" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "home_page_b2b_cta_stats_order_idx" ON "home_page_b2b_cta_stats" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "home_page_b2b_cta_stats_parent_id_idx" ON "home_page_b2b_cta_stats" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "home_page_rels_media_id_idx" ON "home_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "home_page_rels_countries_id_idx" ON "home_page_rels" USING btree ("countries_id");
CREATE INDEX IF NOT EXISTS "home_page_rels_itineraries_id_idx" ON "home_page_rels" USING btree ("itineraries_id");
CREATE INDEX IF NOT EXISTS "destinations_page_rels_order_idx" ON "destinations_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "destinations_page_rels_parent_idx" ON "destinations_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "destinations_page_rels_path_idx" ON "destinations_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "destinations_page_rels_media_id_idx" ON "destinations_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "destinations_page_rels_countries_id_idx" ON "destinations_page_rels" USING btree ("countries_id");
CREATE INDEX IF NOT EXISTS "blog_page_rels_order_idx" ON "blog_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "blog_page_rels_parent_idx" ON "blog_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "blog_page_rels_path_idx" ON "blog_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "blog_page_rels_media_id_idx" ON "blog_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "about_page_values_items_order_idx" ON "about_page_values_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "about_page_values_items_parent_id_idx" ON "about_page_values_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "about_page_why_choose_items_order_idx" ON "about_page_why_choose_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "about_page_why_choose_items_parent_id_idx" ON "about_page_why_choose_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "about_page_team_members_order_idx" ON "about_page_team_members" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "about_page_team_members_parent_id_idx" ON "about_page_team_members" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "about_page_stats_items_order_idx" ON "about_page_stats_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "about_page_stats_items_parent_id_idx" ON "about_page_stats_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "about_page_rels_order_idx" ON "about_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "about_page_rels_parent_idx" ON "about_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "about_page_rels_path_idx" ON "about_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "about_page_rels_media_id_idx" ON "about_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "contact_page_social_links_order_idx" ON "contact_page_social_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "contact_page_social_links_parent_id_idx" ON "contact_page_social_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "contact_page_rels_order_idx" ON "contact_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "contact_page_rels_parent_idx" ON "contact_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "contact_page_rels_path_idx" ON "contact_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "contact_page_rels_media_id_idx" ON "contact_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "faq_page_rels_order_idx" ON "faq_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "faq_page_rels_parent_idx" ON "faq_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "faq_page_rels_path_idx" ON "faq_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "faq_page_rels_media_id_idx" ON "faq_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "itineraries_page_rels_order_idx" ON "itineraries_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "itineraries_page_rels_parent_idx" ON "itineraries_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "itineraries_page_rels_path_idx" ON "itineraries_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "itineraries_page_rels_media_id_idx" ON "itineraries_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "attractions_page_rels_order_idx" ON "attractions_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "attractions_page_rels_parent_idx" ON "attractions_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "attractions_page_rels_path_idx" ON "attractions_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "attractions_page_rels_media_id_idx" ON "attractions_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "cities_page_listing_sort_options_order_idx" ON "cities_page_listing_sort_options" USING btree ("order");
CREATE INDEX IF NOT EXISTS "cities_page_listing_sort_options_parent_idx" ON "cities_page_listing_sort_options" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "cities_page_rels_order_idx" ON "cities_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "cities_page_rels_parent_idx" ON "cities_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "cities_page_rels_path_idx" ON "cities_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "cities_page_rels_media_id_idx" ON "cities_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "cities_page_rels_cities_id_idx" ON "cities_page_rels" USING btree ("cities_id");
CREATE INDEX IF NOT EXISTS "countries_page_listing_regions_order_idx" ON "countries_page_listing_regions" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "countries_page_listing_regions_parent_id_idx" ON "countries_page_listing_regions" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "countries_page_regions_overview_items_order_idx" ON "countries_page_regions_overview_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "countries_page_regions_overview_items_parent_id_idx" ON "countries_page_regions_overview_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "countries_page_rels_order_idx" ON "countries_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "countries_page_rels_parent_idx" ON "countries_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "countries_page_rels_path_idx" ON "countries_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "countries_page_rels_media_id_idx" ON "countries_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "countries_page_rels_countries_id_idx" ON "countries_page_rels" USING btree ("countries_id");
CREATE INDEX IF NOT EXISTS "attraction_detail_config_category_labels_order_idx" ON "attraction_detail_config_category_labels" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "attraction_detail_config_category_labels_parent_id_idx" ON "attraction_detail_config_category_labels" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "city_detail_config_category_labels_order_idx" ON "city_detail_config_category_labels" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "city_detail_config_category_labels_parent_id_idx" ON "city_detail_config_category_labels" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "country_detail_config_continent_labels_order_idx" ON "country_detail_config_continent_labels" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "country_detail_config_continent_labels_parent_id_idx" ON "country_detail_config_continent_labels" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itinerary_detail_config_difficulty_labels_order_idx" ON "itinerary_detail_config_difficulty_labels" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itinerary_detail_config_difficulty_labels_parent_id_idx" ON "itinerary_detail_config_difficulty_labels" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itinerary_detail_config_travel_style_labels_order_idx" ON "itinerary_detail_config_travel_style_labels" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itinerary_detail_config_travel_style_labels_parent_id_idx" ON "itinerary_detail_config_travel_style_labels" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "itinerary_detail_config_packing_category_labels_order_idx" ON "itinerary_detail_config_packing_category_labels" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "itinerary_detail_config_packing_category_labels_parent_id_idx" ON "itinerary_detail_config_packing_category_labels" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_services_items_features_order_idx" ON "expertise_page_services_items_features" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_services_items_features_parent_id_idx" ON "expertise_page_services_items_features" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_services_items_order_idx" ON "expertise_page_services_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_services_items_parent_id_idx" ON "expertise_page_services_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_coverage_regions_highlights_order_idx" ON "expertise_page_coverage_regions_highlights" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_coverage_regions_highlights_parent_id_idx" ON "expertise_page_coverage_regions_highlights" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_coverage_regions_key_attractions_order_idx" ON "expertise_page_coverage_regions_key_attractions" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_coverage_regions_key_attractions_parent_id_idx" ON "expertise_page_coverage_regions_key_attractions" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_coverage_regions_travel_styles_order_idx" ON "expertise_page_coverage_regions_travel_styles" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_coverage_regions_travel_styles_parent_id_idx" ON "expertise_page_coverage_regions_travel_styles" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_coverage_regions_languages_order_idx" ON "expertise_page_coverage_regions_languages" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_coverage_regions_languages_parent_id_idx" ON "expertise_page_coverage_regions_languages" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_coverage_regions_order_idx" ON "expertise_page_coverage_regions" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_coverage_regions_parent_id_idx" ON "expertise_page_coverage_regions" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_capacity_items_order_idx" ON "expertise_page_capacity_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_capacity_items_parent_id_idx" ON "expertise_page_capacity_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_quality_items_order_idx" ON "expertise_page_quality_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_quality_items_parent_id_idx" ON "expertise_page_quality_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_why_us_items_details_order_idx" ON "expertise_page_why_us_items_details" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_why_us_items_details_parent_id_idx" ON "expertise_page_why_us_items_details" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_why_us_items_order_idx" ON "expertise_page_why_us_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "expertise_page_why_us_items_parent_id_idx" ON "expertise_page_why_us_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_rels_order_idx" ON "expertise_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "expertise_page_rels_parent_idx" ON "expertise_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "expertise_page_rels_path_idx" ON "expertise_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "expertise_page_rels_media_id_idx" ON "expertise_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_certifications_items_order_idx" ON "sustainability_page_certifications_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "sustainability_page_certifications_items_parent_id_idx" ON "sustainability_page_certifications_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_initiatives_items_op_approach_order_idx" ON "sustainability_page_initiatives_items_op_approach" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "sustainability_page_initiatives_items_op_approach_parent_id_idx" ON "sustainability_page_initiatives_items_op_approach" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_initiatives_items_order_idx" ON "sustainability_page_initiatives_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "sustainability_page_initiatives_items_parent_id_idx" ON "sustainability_page_initiatives_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_op_standards_practices_details_order_idx" ON "sustainability_page_op_standards_practices_details" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "sustainability_page_op_standards_practices_details_parent_id_idx" ON "sustainability_page_op_standards_practices_details" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_op_standards_practices_order_idx" ON "sustainability_page_op_standards_practices" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "sustainability_page_op_standards_practices_parent_id_idx" ON "sustainability_page_op_standards_practices" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_practices_categories_practices_order_idx" ON "sustainability_page_practices_categories_practices" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "sustainability_page_practices_categories_practices_parent_id_idx" ON "sustainability_page_practices_categories_practices" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_practices_categories_order_idx" ON "sustainability_page_practices_categories" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "sustainability_page_practices_categories_parent_id_idx" ON "sustainability_page_practices_categories" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_supplier_standards_criteria_order_idx" ON "sustainability_page_supplier_standards_criteria" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "sustainability_page_supplier_standards_criteria_parent_id_idx" ON "sustainability_page_supplier_standards_criteria" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_impact_items_measurement_method_order_idx" ON "sustainability_page_impact_items_measurement_method" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "sustainability_page_impact_items_measurement_method_parent_id_idx" ON "sustainability_page_impact_items_measurement_method" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_impact_items_order_idx" ON "sustainability_page_impact_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "sustainability_page_impact_items_parent_id_idx" ON "sustainability_page_impact_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_rels_order_idx" ON "sustainability_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "sustainability_page_rels_parent_idx" ON "sustainability_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "sustainability_page_rels_path_idx" ON "sustainability_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "sustainability_page_rels_media_id_idx" ON "sustainability_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "case_studies_page_partner_logos_logos_order_idx" ON "case_studies_page_partner_logos_logos" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "case_studies_page_partner_logos_logos_parent_id_idx" ON "case_studies_page_partner_logos_logos" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_page_case_studies_items_metrics_order_idx" ON "case_studies_page_case_studies_items_metrics" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "case_studies_page_case_studies_items_metrics_parent_id_idx" ON "case_studies_page_case_studies_items_metrics" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_page_case_studies_items_order_idx" ON "case_studies_page_case_studies_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "case_studies_page_case_studies_items_parent_id_idx" ON "case_studies_page_case_studies_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_page_partner_statements_statements_order_idx" ON "case_studies_page_partner_statements_statements" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "case_studies_page_partner_statements_statements_parent_id_idx" ON "case_studies_page_partner_statements_statements" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_page_testimonials_items_order_idx" ON "case_studies_page_testimonials_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "case_studies_page_testimonials_items_parent_id_idx" ON "case_studies_page_testimonials_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_page_partnership_types_items_order_idx" ON "case_studies_page_partnership_types_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "case_studies_page_partnership_types_items_parent_id_idx" ON "case_studies_page_partnership_types_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_page_rels_order_idx" ON "case_studies_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "case_studies_page_rels_parent_idx" ON "case_studies_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "case_studies_page_rels_path_idx" ON "case_studies_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "case_studies_page_rels_media_id_idx" ON "case_studies_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "partners_page_value_proposition_benefits_order_idx" ON "partners_page_value_proposition_benefits" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "partners_page_value_proposition_benefits_parent_id_idx" ON "partners_page_value_proposition_benefits" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pp_model_features_order_idx" ON "pp_model_features" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pp_model_features_parent_id_idx" ON "pp_model_features" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "partners_page_partnership_models_models_order_idx" ON "partners_page_partnership_models_models" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "partners_page_partnership_models_models_parent_id_idx" ON "partners_page_partnership_models_models" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "partners_page_process_steps_order_idx" ON "partners_page_process_steps" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "partners_page_process_steps_parent_id_idx" ON "partners_page_process_steps" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "partners_page_credentials_downloads_order_idx" ON "partners_page_credentials_downloads" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "partners_page_credentials_downloads_parent_id_idx" ON "partners_page_credentials_downloads" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "partners_page_credentials_certifications_order_idx" ON "partners_page_credentials_certifications" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "partners_page_credentials_certifications_parent_id_idx" ON "partners_page_credentials_certifications" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "partners_page_stats_items_order_idx" ON "partners_page_stats_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "partners_page_stats_items_parent_id_idx" ON "partners_page_stats_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "partners_page_rels_order_idx" ON "partners_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "partners_page_rels_parent_idx" ON "partners_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "partners_page_rels_path_idx" ON "partners_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "partners_page_rels_media_id_idx" ON "partners_page_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "piq_company_type_opts_order_idx" ON "piq_company_type_opts" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "piq_company_type_opts_parent_id_idx" ON "piq_company_type_opts" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "piq_role_opts_order_idx" ON "piq_role_opts" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "piq_role_opts_parent_id_idx" ON "piq_role_opts" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "piq_volume_opts_order_idx" ON "piq_volume_opts" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "piq_volume_opts_parent_id_idx" ON "piq_volume_opts" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "piq_dest_opts_order_idx" ON "piq_dest_opts" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "piq_dest_opts_parent_id_idx" ON "piq_dest_opts" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "piq_svc_opts_order_idx" ON "piq_svc_opts" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "piq_svc_opts_parent_id_idx" ON "piq_svc_opts" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "piq_partner_type_opts_order_idx" ON "piq_partner_type_opts" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "piq_partner_type_opts_parent_id_idx" ON "piq_partner_type_opts" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "piq_hear_opts_order_idx" ON "piq_hear_opts" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "piq_hear_opts_parent_id_idx" ON "piq_hear_opts" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "piq_sidebar_benefits_order_idx" ON "piq_sidebar_benefits" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "piq_sidebar_benefits_parent_id_idx" ON "piq_sidebar_benefits" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "partner_inquiry_page_rels_order_idx" ON "partner_inquiry_page_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "partner_inquiry_page_rels_parent_idx" ON "partner_inquiry_page_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "partner_inquiry_page_rels_path_idx" ON "partner_inquiry_page_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "partner_inquiry_page_rels_media_id_idx" ON "partner_inquiry_page_rels" USING btree ("media_id");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "media";
DROP TABLE "countries_gallery";
DROP TABLE "countries";
DROP TABLE "countries_locales";
DROP TABLE "countries_rels";
DROP TABLE "cities_gallery";
DROP TABLE "cities_highlights";
DROP TABLE "cities";
DROP TABLE "cities_locales";
DROP TABLE "cities_rels";
DROP TABLE "attractions_gallery";
DROP TABLE "attractions_tips";
DROP TABLE "attractions";
DROP TABLE "attractions_locales";
DROP TABLE "attractions_rels";
DROP TABLE "itineraries_travel_style";
DROP TABLE "itineraries_days_activities";
DROP TABLE "itineraries_days";
DROP TABLE "itineraries_blocks_intro_essence";
DROP TABLE "itineraries_blocks_intro_essence_locales";
DROP TABLE "itineraries_blocks_intro";
DROP TABLE "itineraries_blocks_intro_locales";
DROP TABLE "itineraries_blocks_chapter_moments";
DROP TABLE "itineraries_blocks_chapter_moments_locales";
DROP TABLE "itineraries_blocks_chapter";
DROP TABLE "itineraries_blocks_chapter_locales";
DROP TABLE "itineraries_blocks_experience_experiences";
DROP TABLE "itineraries_blocks_experience_experiences_locales";
DROP TABLE "itineraries_blocks_experience";
DROP TABLE "itineraries_blocks_experience_locales";
DROP TABLE "itineraries_blocks_interlude";
DROP TABLE "itineraries_blocks_interlude_locales";
DROP TABLE "itineraries_blocks_gallery_images";
DROP TABLE "itineraries_blocks_gallery_images_locales";
DROP TABLE "itineraries_blocks_gallery";
DROP TABLE "itineraries_blocks_gallery_locales";
DROP TABLE "itineraries_blocks_essentials_categories_items";
DROP TABLE "itineraries_blocks_essentials_categories_items_locales";
DROP TABLE "itineraries_blocks_essentials_categories";
DROP TABLE "itineraries_blocks_essentials_categories_locales";
DROP TABLE "itineraries_blocks_essentials";
DROP TABLE "itineraries_blocks_essentials_locales";
DROP TABLE "itineraries_packing_list";
DROP TABLE "itineraries";
DROP TABLE "itineraries_locales";
DROP TABLE "itineraries_rels";
DROP TABLE "blog_posts";
DROP TABLE "blog_posts_locales";
DROP TABLE "blog_posts_rels";
DROP TABLE "pages_content_blocks";
DROP TABLE "pages_content_blocks_locales";
DROP TABLE "pages";
DROP TABLE "pages_locales";
DROP TABLE "pages_rels";
DROP TABLE "faqs";
DROP TABLE "faqs_locales";
DROP TABLE "case_studies_delivery_approach";
DROP TABLE "case_studies_responsible_practices";
DROP TABLE "case_studies_measurable_results";
DROP TABLE "case_studies_measurable_results_locales";
DROP TABLE "case_studies";
DROP TABLE "case_studies_locales";
DROP TABLE "case_studies_rels";
DROP TABLE "contact_submissions";
DROP TABLE "partner_inquiries_destinations_of_interest";
DROP TABLE "partner_inquiries_services_of_interest";
DROP TABLE "partner_inquiries";
DROP TABLE "partner_inquiries_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";
DROP TABLE "site_header_navigation_children";
DROP TABLE "site_header_navigation_children_locales";
DROP TABLE "site_header_navigation";
DROP TABLE "site_header_navigation_locales";
DROP TABLE "site_header";
DROP TABLE "site_header_locales";
DROP TABLE "site_header_rels";
DROP TABLE "site_footer_columns_links";
DROP TABLE "site_footer_columns_links_locales";
DROP TABLE "site_footer_columns";
DROP TABLE "site_footer_columns_locales";
DROP TABLE "site_footer_social_links";
DROP TABLE "site_footer_bottom_bar_legal_links";
DROP TABLE "site_footer_bottom_bar_legal_links_locales";
DROP TABLE "site_footer";
DROP TABLE "site_footer_locales";
DROP TABLE "site_footer_rels";
DROP TABLE "home_page_testimonials_items";
DROP TABLE "home_page_testimonials_items_locales";
DROP TABLE "home_page_b2b_stats_items";
DROP TABLE "home_page_b2b_stats_items_locales";
DROP TABLE "home_page_b2b_value_proposition_highlights";
DROP TABLE "home_page_b2b_value_proposition_highlights_locales";
DROP TABLE "home_page_b2b_services_overview_services_features";
DROP TABLE "home_page_b2b_services_overview_services_features_locales";
DROP TABLE "home_page_b2b_services_overview_services";
DROP TABLE "home_page_b2b_services_overview_services_locales";
DROP TABLE "home_page_b2b_credentials_items";
DROP TABLE "home_page_b2b_credentials_items_locales";
DROP TABLE "home_page_b2b_partner_showcase_partners";
DROP TABLE "home_page_b2b_partner_showcase_partners_locales";
DROP TABLE "home_page_b2b_cta_stats";
DROP TABLE "home_page_b2b_cta_stats_locales";
DROP TABLE "home_page";
DROP TABLE "home_page_locales";
DROP TABLE "home_page_rels";
DROP TABLE "destinations_page";
DROP TABLE "destinations_page_locales";
DROP TABLE "destinations_page_rels";
DROP TABLE "blog_page";
DROP TABLE "blog_page_locales";
DROP TABLE "blog_page_rels";
DROP TABLE "about_page_values_items";
DROP TABLE "about_page_values_items_locales";
DROP TABLE "about_page_why_choose_items";
DROP TABLE "about_page_why_choose_items_locales";
DROP TABLE "about_page_team_members";
DROP TABLE "about_page_team_members_locales";
DROP TABLE "about_page_stats_items";
DROP TABLE "about_page_stats_items_locales";
DROP TABLE "about_page";
DROP TABLE "about_page_locales";
DROP TABLE "about_page_rels";
DROP TABLE "contact_page_social_links";
DROP TABLE "contact_page";
DROP TABLE "contact_page_locales";
DROP TABLE "contact_page_rels";
DROP TABLE "faq_page";
DROP TABLE "faq_page_locales";
DROP TABLE "faq_page_rels";
DROP TABLE "itineraries_page";
DROP TABLE "itineraries_page_locales";
DROP TABLE "itineraries_page_rels";
DROP TABLE "attractions_page";
DROP TABLE "attractions_page_locales";
DROP TABLE "attractions_page_rels";
DROP TABLE "cities_page_listing_sort_options";
DROP TABLE "cities_page";
DROP TABLE "cities_page_locales";
DROP TABLE "cities_page_rels";
DROP TABLE "countries_page_listing_regions";
DROP TABLE "countries_page_listing_regions_locales";
DROP TABLE "countries_page_regions_overview_items";
DROP TABLE "countries_page_regions_overview_items_locales";
DROP TABLE "countries_page";
DROP TABLE "countries_page_locales";
DROP TABLE "countries_page_rels";
DROP TABLE "attraction_detail_config_category_labels";
DROP TABLE "attraction_detail_config_category_labels_locales";
DROP TABLE "attraction_detail_config";
DROP TABLE "attraction_detail_config_locales";
DROP TABLE "city_detail_config_category_labels";
DROP TABLE "city_detail_config_category_labels_locales";
DROP TABLE "city_detail_config";
DROP TABLE "city_detail_config_locales";
DROP TABLE "country_detail_config_continent_labels";
DROP TABLE "country_detail_config_continent_labels_locales";
DROP TABLE "country_detail_config";
DROP TABLE "country_detail_config_locales";
DROP TABLE "itinerary_detail_config_difficulty_labels";
DROP TABLE "itinerary_detail_config_difficulty_labels_locales";
DROP TABLE "itinerary_detail_config_travel_style_labels";
DROP TABLE "itinerary_detail_config_travel_style_labels_locales";
DROP TABLE "itinerary_detail_config_packing_category_labels";
DROP TABLE "itinerary_detail_config_packing_category_labels_locales";
DROP TABLE "itinerary_detail_config";
DROP TABLE "itinerary_detail_config_locales";
DROP TABLE "expertise_page_services_items_features";
DROP TABLE "expertise_page_services_items_features_locales";
DROP TABLE "expertise_page_services_items";
DROP TABLE "expertise_page_services_items_locales";
DROP TABLE "expertise_page_coverage_regions_highlights";
DROP TABLE "expertise_page_coverage_regions_highlights_locales";
DROP TABLE "expertise_page_coverage_regions_key_attractions";
DROP TABLE "expertise_page_coverage_regions_key_attractions_locales";
DROP TABLE "expertise_page_coverage_regions_travel_styles";
DROP TABLE "expertise_page_coverage_regions_travel_styles_locales";
DROP TABLE "expertise_page_coverage_regions_languages";
DROP TABLE "expertise_page_coverage_regions_languages_locales";
DROP TABLE "expertise_page_coverage_regions";
DROP TABLE "expertise_page_coverage_regions_locales";
DROP TABLE "expertise_page_capacity_items";
DROP TABLE "expertise_page_capacity_items_locales";
DROP TABLE "expertise_page_quality_items";
DROP TABLE "expertise_page_quality_items_locales";
DROP TABLE "expertise_page_why_us_items_details";
DROP TABLE "expertise_page_why_us_items_details_locales";
DROP TABLE "expertise_page_why_us_items";
DROP TABLE "expertise_page_why_us_items_locales";
DROP TABLE "expertise_page";
DROP TABLE "expertise_page_locales";
DROP TABLE "expertise_page_rels";
DROP TABLE "sustainability_page_certifications_items";
DROP TABLE "sustainability_page_certifications_items_locales";
DROP TABLE "sustainability_page_initiatives_items_op_approach";
DROP TABLE "sustainability_page_initiatives_items_op_approach_locales";
DROP TABLE "sustainability_page_initiatives_items";
DROP TABLE "sustainability_page_initiatives_items_locales";
DROP TABLE "sustainability_page_op_standards_practices_details";
DROP TABLE "sustainability_page_op_standards_practices_details_locales";
DROP TABLE "sustainability_page_op_standards_practices";
DROP TABLE "sustainability_page_op_standards_practices_locales";
DROP TABLE "sustainability_page_practices_categories_practices";
DROP TABLE "sustainability_page_practices_categories_practices_locales";
DROP TABLE "sustainability_page_practices_categories";
DROP TABLE "sustainability_page_practices_categories_locales";
DROP TABLE "sustainability_page_supplier_standards_criteria";
DROP TABLE "sustainability_page_supplier_standards_criteria_locales";
DROP TABLE "sustainability_page_impact_items_measurement_method";
DROP TABLE "sustainability_page_impact_items_measurement_method_locales";
DROP TABLE "sustainability_page_impact_items";
DROP TABLE "sustainability_page_impact_items_locales";
DROP TABLE "sustainability_page";
DROP TABLE "sustainability_page_locales";
DROP TABLE "sustainability_page_rels";
DROP TABLE "case_studies_page_partner_logos_logos";
DROP TABLE "case_studies_page_case_studies_items_metrics";
DROP TABLE "case_studies_page_case_studies_items_metrics_locales";
DROP TABLE "case_studies_page_case_studies_items";
DROP TABLE "case_studies_page_case_studies_items_locales";
DROP TABLE "case_studies_page_partner_statements_statements";
DROP TABLE "case_studies_page_partner_statements_statements_locales";
DROP TABLE "case_studies_page_testimonials_items";
DROP TABLE "case_studies_page_testimonials_items_locales";
DROP TABLE "case_studies_page_partnership_types_items";
DROP TABLE "case_studies_page_partnership_types_items_locales";
DROP TABLE "case_studies_page";
DROP TABLE "case_studies_page_locales";
DROP TABLE "case_studies_page_rels";
DROP TABLE "partners_page_value_proposition_benefits";
DROP TABLE "partners_page_value_proposition_benefits_locales";
DROP TABLE "pp_model_features";
DROP TABLE "pp_model_features_locales";
DROP TABLE "partners_page_partnership_models_models";
DROP TABLE "partners_page_partnership_models_models_locales";
DROP TABLE "partners_page_process_steps";
DROP TABLE "partners_page_process_steps_locales";
DROP TABLE "partners_page_credentials_downloads";
DROP TABLE "partners_page_credentials_downloads_locales";
DROP TABLE "partners_page_credentials_certifications";
DROP TABLE "partners_page_stats_items";
DROP TABLE "partners_page_stats_items_locales";
DROP TABLE "partners_page";
DROP TABLE "partners_page_locales";
DROP TABLE "partners_page_rels";
DROP TABLE "piq_company_type_opts";
DROP TABLE "piq_company_type_opts_locales";
DROP TABLE "piq_role_opts";
DROP TABLE "piq_role_opts_locales";
DROP TABLE "piq_volume_opts";
DROP TABLE "piq_volume_opts_locales";
DROP TABLE "piq_dest_opts";
DROP TABLE "piq_dest_opts_locales";
DROP TABLE "piq_svc_opts";
DROP TABLE "piq_svc_opts_locales";
DROP TABLE "piq_partner_type_opts";
DROP TABLE "piq_partner_type_opts_locales";
DROP TABLE "piq_hear_opts";
DROP TABLE "piq_hear_opts_locales";
DROP TABLE "piq_sidebar_benefits";
DROP TABLE "piq_sidebar_benefits_locales";
DROP TABLE "partner_inquiry_page";
DROP TABLE "partner_inquiry_page_locales";
DROP TABLE "partner_inquiry_page_rels";`);

};
