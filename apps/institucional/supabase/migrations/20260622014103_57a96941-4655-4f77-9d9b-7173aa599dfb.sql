
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "Anyone records a view" ON public.post_views;
CREATE POLICY "Anyone records a view" ON public.post_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.posts p
    WHERE p.id = post_views.post_id AND p.status = 'published'
  ));
