
CREATE POLICY "blog-covers public read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'blog-covers');

CREATE POLICY "blog-covers admin insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "blog-covers admin update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "blog-covers admin delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));
