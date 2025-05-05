
import { supabase } from "@/integrations/supabase/client";

export async function createDEPrepQuestion({
  question,
  category,
  tags,
  substackLink,
  difficulty,
}: {
  question: string;
  category: string;
  tags: string[];
  substackLink: string;
  difficulty: string;
}) {
  // First, get or create the category
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("name", category)
    .single();

  if (categoryError) {
    // If category doesn't exist, create it
    const { data: newCategory, error: createCategoryError } = await supabase
      .from("categories")
      .insert({ name: category })
      .select()
      .single();

    if (createCategoryError) throw createCategoryError;
    var categoryId = newCategory.id;
  } else {
    var categoryId = categoryData.id;
  }

  // Convert difficulty to lowercase to match database expectations
  const normalizedDifficulty = difficulty.toLowerCase();
  
  // Insert the question
  const { data: questionData, error: questionError } = await supabase
    .from("questions")
    .insert({
      question,
      category_id: categoryId,
      substack_link: substackLink,
      difficulty: normalizedDifficulty,
    })
    .select()
    .single();

  if (questionError) {
    console.error("Error inserting question:", questionError);
    throw questionError;
  }

  // Handle tags
  const tagPromises = tags.map(async (tagName) => {
    // Get or create tag
    const { data: existingTag } = await supabase
      .from("tags")
      .select("id")
      .eq("name", tagName)
      .single();

    if (existingTag) {
      return existingTag.id;
    } else {
      const { data: newTag } = await supabase
        .from("tags")
        .insert({ name: tagName })
        .select()
        .single();
      return newTag?.id;
    }
  });

  const tagIds = await Promise.all(tagPromises);

  // Create question_tags relationships
  const questionTagsData = tagIds.map((tagId) => ({
    question_id: questionData.id,
    tag_id: tagId,
  }));

  const { error: questionTagsError } = await supabase
    .from("question_tags")
    .insert(questionTagsData);

  if (questionTagsError) throw questionTagsError;

  return questionData;
}

export async function createDEProject({
  title,
  description,
  tags,
  substackLink,
}: {
  title: string;
  description: string;
  tags: string[];
  substackLink: string;
}) {
  // Insert the project
  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .insert({
      title,
      description,
      substack_link: substackLink,
    })
    .select()
    .single();

  if (projectError) throw projectError;

  // Handle tags
  const tagPromises = tags.map(async (tagName) => {
    // Get or create tag
    const { data: existingTag } = await supabase
      .from("tags")
      .select("id")
      .eq("name", tagName)
      .single();

    if (existingTag) {
      return existingTag.id;
    } else {
      const { data: newTag } = await supabase
        .from("tags")
        .insert({ name: tagName })
        .select()
        .single();
      return newTag?.id;
    }
  });

  const tagIds = await Promise.all(tagPromises);

  // Create project_tags relationships
  const projectTagsData = tagIds.map((tagId) => ({
    project_id: projectData.id,
    tag_id: tagId,
  }));

  const { error: projectTagsError } = await supabase
    .from("project_tags")
    .insert(projectTagsData);

  if (projectTagsError) throw projectTagsError;

  return projectData;
}
