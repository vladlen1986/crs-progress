# [Guide] How to Upload Files to the File Manager from Plugin Actions
> Source: https://forum.bubble.io/t/guide-how-to-upload-files-to-the-file-manager-from-plugin-actions/273952 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 8 posts · topic: data-api

## Original post (by @nicholasrbarrow)

I recently got asked this question (http://forum.bubble.io/t/need-help-converting-base64-to-a-png-svg-via-plugin/127844/3) and realized how poorly documented the answer is, and that the solution is scattered across the forum (and will soon be different, since Node 18 is rolling out): “how do you upload a base64 file to the file manager”?

I’ll just dump my experiences as a plugin developer for anyone who stumbles across them.
FYI

- this is advice IMHO; I don’t pretend this is a perfect answer, and it may be incomplete and imperfect (such as my lack-of-knowledge surrounding how to upload private files, as noted below; I’ve never needed to learn how, so I just don’t know)

- this is meant to be a good resource for anyone just starting out with plugin development and needs a quick answer to the question (as to how to get a raw file into the file manager from a plugin action)

- I’m trying to save others the time and energy that took me to learn the information below, not tell others the correct way or best way (again, this is all IMHO)

Basics

- Bubble uses an unprotected file upload endpoint `/fileupload` relative to the website home address (yes, I know, this is awful, I’ve warned them privately and publicly and Bubble just doesn’t care). Since the endpoint is here and here to stay, I choose to utilize it.

- To upload a file, you need to POST a json to `website-home-url/fileupload` with the following config:

- headers: set content-type to `application/json`

- body: an object containing the filename and data (more below)

- I recommend using Axios (more below) to handle your HTTP request

- server-side actions (make a private plugin for yourself, even, if this is something you need for only your app) with the HTTP dependency (such as Axios) have proved the best for me

- you can take in the website home url (https://manual.bubble.io/core-resources/data/data-sources#website-home-url) dynamically by creating a dynamic text input and just specifying in the documentation/help-text to `please enter the dynamic bubble value 'website home url'` (you can’t enforce this, but it will likely break if you/your plugin’s users don’t follow this

- the `website home url` value will correctly adjust to your test environments versus your production environments and still work correctly

Structure of the POST Request

The body of the POST request should be a JSON object (note that, depending on which library you use to make the HTTP request, you may need to first JSON.strinigfy the data [required to use the `fetch` API (example Bubble implementation (http://forum.bubble.io/t/promise-patterns-in-the-plugin-api-version-4/273364#json-post-3)), optional in Axios: 
```

```

- 
- ````
- ``

```

```

``
```

```

``````
 (https://bubble.io/plugin_editor?id=1609209698393x206083649188921340&tab=tabs-5)`` (https://bubble.io/plugin/barcode-generator-1609209698393x206083649188921340)

````
````````
````
``

## Reply by @aaronsheldon (6 likes)

Well I guess I’ll give away my secret sauce. Here is how I restructured file uploads to work with the version 4 API, and in particular with the `fetch` global. This code assumes the base64 is passed in `properties.contents`, the filename in `properties.filename`, the website home in `properties.homeurl`, the privacy flag in `properties.private`, and the thing to scope the privacy to in `properties.attachto`. If the file is private but no scoping thing is supplied it defaults to the current user. Note that in version 4 you can safely return a promise, in this case containing the URL in the field `savedfile`. I have also exploited the new `id()` function for things. Finally pay carefully attention to the `Accept` header as Bubble returns the URL in a bare string:

```
// Ingest
const url = properties.homeurl + "fileupload";
const protocol = properties.private ? "" : "https:";
const payload = {
    name: properties.filename,
    contents: properties.contents
};

// Private and assigned
if (properties.private && properties.attachto) {
    payload.private = true;
    payload.attach_to = properties.attachtto.id();
}

// Private and default
else if (properties.private) {
    payload.private = true;
    payload.attach_to = context.currentUser.id();
}

// POST options
const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "text/plain"
    },
    body: JSON.stringify(payload)
};

// Digest
const response = fetch(url, options)
.then((response) => { return response.text(); })
.then((text) => { return { savedfile: protocol + text }; });

// Excrete
return response;

```

## Reply by @Sarah_Esteve (1 likes)

What I do is create the file with the “New file from base64” action from the csv creator plugin from @eli then upload the file with the bubble plugin “File uploader bubble api”

## Reply by @jared.gibb (0 likes)

Does anyone know the hard limit for file size in plugin uploads? Am I missing something somewhere?

## Reply by @bernhard1 (0 likes)

You just save me @nicholasrbarrow ! Thanks so much! How can a file upload be unprotected though? This is a huge security risk.

Can we somehow help to escalate this with the bubble.io (http://bubble.io) team?

## Reply by @nicholasrbarrow (0 likes)

@jared.gibb sorry for the delay; the limit is 5 GB:
