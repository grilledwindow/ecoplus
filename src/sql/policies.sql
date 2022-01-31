DROP POLICY IF EXISTS public_select ON storage.objects;
DROP POLICY IF EXISTS auth_insert ON storage.objects;
DROP POLICY IF EXISTS auth_update ON storage.objects;

CREATE POLICY public_select
ON storage.objects
FOR SELECT USING (
  bucket_id = 'public'
);

CREATE POLICY auth_insert
ON storage.objects
FOR INSERT WITH CHECK (
	bucket_id = 'public'
  AND auth.role() = 'authenticated'
);

CREATE POLICY auth_update
ON storage.objects
FOR UPDATE USING (
	bucket_id = 'public'
  AND auth.role() = 'authenticated'
);


DROP POLICY IF EXISTS objects_public_select ON storage.objects;
DROP POLICY IF EXISTS objects_auth_insert ON storage.objects;
DROP POLICY IF EXISTS objects_auth_update ON storage.objects;
DROP POLICY IF EXISTS objects_auth_delete ON storage.objects;

CREATE POLICY objects_public_select
ON storage.objects
FOR SELECT USING (
  true
);

CREATE POLICY objects_auth_insert
ON storage.objects
FOR INSERT WITH CHECK (
  auth.role() = 'authenticated'
);

CREATE POLICY objects_auth_update
ON storage.objects
FOR UPDATE USING (
  auth.role() = 'authenticated'
);

CREATE POLICY objects_auth_delete
ON storage.objects
FOR UPDATE WITH CHECK (
  auth.role() = 'authenticated'
);
