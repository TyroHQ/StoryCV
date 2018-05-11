// import { linkResolver } from "@src/prismic";
// import { RootState } from "Features/reducers";
// import { prismic } from "Features/selectors";
// import { selectors as getCentury } from "Features/commerce";
// import { NavItemComponentProps as NavItemProps } from "Components/website/NavItem";
// import { Link, RichText } from "prismic-reactjs";
// import createCachedSelector from "re-reselect";
// import { createSelector } from "reselect";
// import { PartialLoadable, LoadableState } from "Common/Loadable";

// export const currentCourseSlug = createSelector(prismic, items => {
//   return items.current.page.slug;
//   // const course = items.courses[items.current.page.slug];

//   // if (course.state === "loaded") return course.century_course_id;
// });

// export const prismicCourse = createCachedSelector(
//   prismic,
//   (state: RootState, slug: string) => slug,
//   (prismic, slug) => prismic.courses[slug]
// )((state, slug: string) => slug);

// type CourseReturnStrand = {
//   id: string;
//   name: string;
//   size: number;
//   time?: string;
//   difficulty?: string;
//   description?: React.ReactNode;
// };
// type CourseReturn = PartialLoadable<
//   {
//     title: React.ReactNode;
//     name: string;
//     price: number;
//     description?: React.ReactNode;
//     rating?: number;
//     subject?: string;
//     level?: string;
//     prismicId: string;
//     centuryId: string;
//     strands: CourseReturnStrand[];
//   },
//   | "title"
//   | "name"
//   | "price"
//   | "description"
//   | "rating"
//   | "subject"
//   | "level"
//   | "prismicId"
//   | "centuryId"
// >;
// export const courseAugmented = (
//   state: RootState,
//   slug: string
// ): CourseReturn => {
//   const _course = prismicCourse(state, slug);
//   if (_course === undefined || _course.state !== LoadableState.LOADED)
//     return { state: LoadableState.PENDING };

//   const course = _course.item;

//   const common = {
//     title: RichText.render(course.title, linkResolver),
//     name: RichText.asText(course.title),
//     price: course.price,
//     description:
//       course.description.length > 0
//         ? RichText.render(course.description, linkResolver)
//         : undefined,
//     rating:
//       course.rating !== undefined && course.rating > 0 && course.rating < 5
//         ? course.rating
//         : undefined,
//     subject:
//       course.subject !== undefined && course.subject.length > 0
//         ? course.subject
//         : undefined,
//     level:
//       course.level !== undefined && course.level.length > 0
//         ? course.level
//         : undefined,
//     prismicId: course.id,
//     centuryId: course.century_course_id
//   };

//   const centuryCourse = getCentury.course(state, course.century_course_id);
//   if (centuryCourse.state !== LoadableState.LOADED)
//     return { state: LoadableState.PARTIAL, item: common };

//   const strands: CourseReturnStrand[] = centuryCourse.item.strands.map(s => {
//     const override = course.strands.find(({ strand_id }) => strand_id === s.id);
//     if (override == null)
//       return {
//         id: s.id,
//         name: s.name,
//         size: s.nuggets.length
//       };

//     return {
//       id: s.id,
//       size: s.nuggets.length,
//       name:
//         override.title != null && override.title.length > 0
//           ? override.title
//           : s.name,

//       description:
//         override.description != null && override.description.length > 0
//           ? RichText.render(override.description, linkResolver)
//           : undefined,

//       length:
//         override.time != null && override.time.length > 0
//           ? override.time
//           : undefined,

//       difficulty:
//         override.difficulty != null && override.difficulty.length > 0
//           ? override.difficulty
//           : undefined
//     };
//   });

//   const ret: CourseReturn = {
//     state: LoadableState.LOADED,
//     item: {
//       centuryId: centuryCourse.item._id,
//       strands,
//       ...common,
//       title: common.title || centuryCourse.item.name,
//       description:
//         common.description ||
//         (centuryCourse.item.description.length > 0
//           ? centuryCourse.item.description
//           : undefined)
//       // subject: common.subject, // TODO: Resolve century subject if this is null
//       // level: course.level, // TODO: Resolve century subject if this is null
//     }
//   };

//   return ret;
// };

// // export const courseAugmented = createCachedSelector(
// //   prismicCourse,
// //   (state, courseSlug) => getCentury.course,
// //   (prismicCourse, centuryCourse): CourseReturn => {
// //     if (prismicCourse.state !== "loaded") return { state: "PENDING" };
// //     if (centuryCourse.state !== "LOADED") return { state: "PENDING" };
// //     let x = centuryCourse.history;
// //   }
// // )((state, courseId) => courseId);

// export const currentPage = createSelector(prismic, items => {
//   const { type, slug } = items.current.page;
//   switch (type) {
//     case "page":
//       return items.pages[slug];
//     case "course":
//       return items.courses[slug];
//   }
//   return null;
// });

// export const loadedPages = createSelector(prismic, p => {
//   return Object.keys(p.pages).filter(k => p.pages[k] != null);
// });

// export const websiteSettings = createSelector(prismic, items => items.settings);

// export const websiteLogo = createSelector(
//   websiteSettings,
//   settings => (settings === null ? null : settings.logo)
// );

// export const navigationItems = createSelector(
//   prismic,
//   items => items.navigationItems
// );

// export const websiteHomePage = createSelector(
//   websiteSettings,
//   settings => settings.homepage
// );

// export const copyrightNotice = createSelector(
//   websiteSettings,
//   settings => settings.copyright
// );
// export const footer_navigation = createSelector(websiteSettings, settings =>
//   settings.footer_navigation.map(s => ({
//     text: s.text,
//     link: Link.url(s.link, linkResolver)
//   }))
// );

// export const footer_socials = createSelector(websiteSettings, settings =>
//   settings.socials.map(s => ({
//     icon: s.icon,
//     link: Link.url(s.link, linkResolver)
//   }))
// );

// export const websiteNavigation = createSelector(
//   websiteSettings,
//   navigationItems,
//   (settings, ns): NavItemProps[] | null => {
//     if (settings == null) return null;

//     const navs = settings.navigation
//       .filter(id => id in ns)
//       .map(id => ns[id])
//       .map((x): NavItemProps | null => {
//         if (x.state === LoadableState.PARTIAL) {
//           return { type: "PARTIAL", ...x.item };
//         }
//         if (x.state !== LoadableState.LOADED) {
//           return null;
//         }
//         return {
//           type: "NAVIGATION",
//           text: x.item.text,
//           link: Link.url(x.item.link, linkResolver),
//           subnav: x.item.body.map(
//             (s): NavItemProps =>
//               s.slice_type == "divider"
//                 ? { type: "DIVIDER" }
//                 : s.slice_type == "subheader"
//                   ? { type: "HEADER", text: s.primary.text }
//                   : {
//                       type: "NAVIGATION",
//                       text: s.primary.text,
//                       link: Link.url(s.primary.link, linkResolver)
//                     }
//           )
//         };
//       })
//       .filter((x): x is NavItemProps => x !== null);
//     return navs;
//   }
// );
