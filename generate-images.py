#!/usr/bin/env python3
"""Generate product images for FormBlends using Together AI FLUX."""
import os
import base64
import json
import time
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

API_KEY = "tgp_v1_IdfVTJC5v8b4NgvOicU4nMmhkOODjiE3EE9Z9VmaKLM"
OUTPUT_DIR = "/Users/willdeane/Desktop/formblends/app/public/images"

def generate_image(prompt: str, filename: str, width=1024, height=1024):
    """Generate an image using Together AI FLUX."""
    filepath = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(filepath):
        print(f"  SKIP {filename} (exists)")
        return filepath

    print(f"  Generating {filename}...")
    try:
        resp = requests.post(
            "https://api.together.xyz/v1/images/generations",
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "black-forest-labs/FLUX.1-schnell",
                "prompt": prompt,
                "width": width,
                "height": height,
                "steps": 4,
                "n": 1,
                "response_format": "b64_json",
            },
            timeout=60,
        )
        resp.raise_for_status()
        data = resp.json()
        img_b64 = data["data"][0]["b64_json"]
        with open(filepath, "wb") as f:
            f.write(base64.b64decode(img_b64))
        print(f"  OK {filename}")
        return filepath
    except Exception as e:
        print(f"  FAIL {filename}: {e}")
        return None

# ── Product Images ──────────────────────────────────────────────────────────
product_images = [
    # GLP-1 Products
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a green cap, labeled 'Semaglutide 5mg', on a clean white marble surface with soft studio lighting, subtle green gradient background, pharmaceutical grade aesthetic, ultra sharp focus, commercial product shot, minimalist luxury",
        "filename": "products/semaglutide.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a blue cap, labeled 'Tirzepatide 5mg', on a clean white marble surface with soft studio lighting, subtle blue gradient background, pharmaceutical grade aesthetic, ultra sharp focus, commercial product shot, minimalist luxury",
        "filename": "products/tirzepatide.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a teal cap, labeled 'Liraglutide 3mg', on a clean white surface with soft studio lighting, pharmaceutical grade, ultra sharp, commercial product shot, minimalist",
        "filename": "products/liraglutide.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with an orange cap on a clean white surface, soft studio lighting, peptide research product, ultra sharp focus, commercial photography, minimalist luxury aesthetic",
        "filename": "products/aod-9604.jpg",
    },
    # Recovery Products
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a red cap, labeled 'BPC-157', on a clean white marble surface, soft warm studio lighting, pharmaceutical grade aesthetic, ultra sharp focus, commercial product shot, healing recovery theme",
        "filename": "products/bpc-157.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a purple cap, labeled 'TB-500', on a clean white marble surface, soft studio lighting, pharmaceutical grade aesthetic, ultra sharp, commercial product shot",
        "filename": "products/tb-500.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of two elegant glass peptide vials side by side, one red cap one purple cap, on a clean white marble surface, soft studio lighting, peptide blend product, commercial photography, premium aesthetic",
        "filename": "products/bpc-tb-blend.jpg",
    },
    # Growth Products
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a gold cap on a clean white marble surface, soft studio lighting, growth hormone peptide, ultra sharp focus, commercial product shot, luxury aesthetic",
        "filename": "products/cjc-ipamorelin.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a sleek dark dropper bottle labeled 'MK-677 25mg/mL' on a clean white surface, oral liquid supplement, soft studio lighting, ultra sharp focus, commercial product shot, modern premium",
        "filename": "products/mk-677.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single small elegant glass peptide vial with a silver cap on a clean white marble surface, growth factor research peptide, soft studio lighting, ultra sharp, commercial photography",
        "filename": "products/igf-1-lr3.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a dark blue cap on a clean white surface, soft studio lighting, pharmaceutical grade, ultra sharp focus, commercial product shot",
        "filename": "products/hexarelin.jpg",
    },
    # Anti-Aging Products
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a white cap on a clean white marble surface with subtle gold accents, longevity anti-aging peptide, soft warm studio lighting, ultra sharp, commercial product shot, luxury aesthetic",
        "filename": "products/epithalon.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a copper-colored cap on a clean white marble surface, copper peptide product, warm studio lighting, ultra sharp focus, commercial product shot, premium aesthetic",
        "filename": "products/ghk-cu.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass vial with amber liquid and a white cap on a clean white surface, NAD supplement, soft studio lighting, ultra sharp focus, commercial product shot, wellness aesthetic",
        "filename": "products/nad-plus.jpg",
    },
    # Cognitive Products
    {
        "prompt": "Professional pharmaceutical product photography of a nasal spray bottle with a clean modern design on a white marble surface, nootropic brain peptide product, soft blue-tinted studio lighting, ultra sharp focus, commercial product shot, cognitive enhancement aesthetic",
        "filename": "products/semax.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a nasal spray bottle with a clean modern design on a white surface, anxiolytic nootropic peptide, soft calming studio lighting, ultra sharp focus, commercial product shot, calm clarity aesthetic",
        "filename": "products/selank.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single small elegant glass peptide vial with a dark cap on a clean white marble surface, cognitive enhancement research peptide, soft studio lighting, ultra sharp, commercial photography, premium",
        "filename": "products/dihexa.jpg",
    },
    # Immune Products
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a green cap on a clean white surface, immune system peptide, soft green-tinted studio lighting, ultra sharp focus, commercial product shot, health wellness aesthetic",
        "filename": "products/thymosin-alpha-1.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a white cap on a clean white surface, antimicrobial peptide, soft clean studio lighting, ultra sharp focus, commercial product shot",
        "filename": "products/ll-37.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a light green cap on a clean white surface, gut health anti-inflammatory peptide, soft natural studio lighting, ultra sharp, commercial product shot",
        "filename": "products/kpv.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a dark navy cap on a clean white surface, sleep peptide, soft purple-blue tinted studio lighting, ultra sharp, commercial product shot, tranquil aesthetic",
        "filename": "products/dsip.jpg",
    },
    # Skin & Sexual Wellness
    {
        "prompt": "Professional product photography of a luxury skincare serum bottle with dropper, frosted glass with copper accents, on a clean white marble surface with a small green leaf, topical copper peptide serum, soft warm studio lighting, ultra sharp, luxury beauty aesthetic",
        "filename": "products/ghk-cu-topical.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a bronze cap on a clean white surface, tanning peptide, soft warm studio lighting, ultra sharp focus, commercial product shot",
        "filename": "products/melanotan-ii.jpg",
    },
    {
        "prompt": "Professional pharmaceutical product photography of a single elegant glass peptide vial with a dark red cap on a clean white marble surface, wellness peptide, soft studio lighting, ultra sharp focus, commercial product shot, premium aesthetic",
        "filename": "products/pt-141.jpg",
    },
]

# ── Hero / Brand Images ────────────────────────────────────────────────────
hero_images = [
    {
        "prompt": "Wide cinematic shot of a fit confident woman in her 30s standing on a sunlit hilltop at golden hour, wearing athleisure, looking out at a beautiful landscape, weight loss transformation success, healthy lifestyle, warm natural lighting, editorial photography style, shallow depth of field, aspirational and empowering, no text",
        "filename": "hero/hero-woman.jpg",
        "width": 1792,
        "height": 1024,
    },
    {
        "prompt": "Wide cinematic shot of a fit confident man in his 40s jogging on a coastal trail at sunrise, athletic build, healthy active lifestyle, golden hour warm lighting, editorial photography style, shallow depth of field, aspirational and empowering, no text",
        "filename": "hero/hero-man.jpg",
        "width": 1792,
        "height": 1024,
    },
    {
        "prompt": "Professional still life product photography of three premium pharmaceutical glass peptide vials arranged in a triangle formation on a white marble surface with soft green botanical elements, luxury peptide brand aesthetic, clean modern, soft studio lighting with slight green color cast, ultra sharp focus, high-end commercial photography, no text",
        "filename": "hero/hero-products.jpg",
        "width": 1792,
        "height": 1024,
    },
    {
        "prompt": "Clean modern pharmaceutical laboratory environment, scientist in white coat examining a vial under bright clean lighting, state of the art equipment in background, quality testing theme, professional editorial photography, sharp focus, trust and science aesthetic, no text",
        "filename": "hero/lab-quality.jpg",
        "width": 1792,
        "height": 1024,
    },
    {
        "prompt": "Aerial overhead flat lay of pharmaceutical peptide vials, syringes, and research documents arranged neatly on a clean white surface with subtle green accents, clinical aesthetic, soft even lighting, ultra sharp focus, professional product photography, brand content, no text",
        "filename": "hero/flatlay.jpg",
        "width": 1792,
        "height": 1024,
    },
]

# ── Testimonial Avatars ────────────────────────────────────────────────────
testimonial_images = [
    {
        "prompt": "Professional headshot portrait of a friendly smiling woman, age 42, brown hair, casual but polished look, warm natural lighting, shallow depth of field, white background, authentic and relatable, high quality portrait photography",
        "filename": "testimonials/sarah.jpg",
        "width": 512,
        "height": 512,
    },
    {
        "prompt": "Professional headshot portrait of a confident smiling Black man, age 38, short hair, casual shirt, warm natural lighting, shallow depth of field, white background, authentic and relatable, high quality portrait photography",
        "filename": "testimonials/marcus.jpg",
        "width": 512,
        "height": 512,
    },
    {
        "prompt": "Professional headshot portrait of a friendly smiling Asian woman, age 35, shoulder-length black hair, casual professional look, warm natural lighting, shallow depth of field, white background, authentic, high quality portrait photography",
        "filename": "testimonials/jennifer.jpg",
        "width": 512,
        "height": 512,
    },
    {
        "prompt": "Professional headshot portrait of a friendly smiling Chinese man, age 51, salt and pepper hair, casual polo shirt, warm natural lighting, shallow depth of field, white background, authentic, high quality portrait photography",
        "filename": "testimonials/david.jpg",
        "width": 512,
        "height": 512,
    },
    {
        "prompt": "Professional headshot portrait of a confident smiling Latina woman, age 29, long dark hair, casual look, warm natural lighting, shallow depth of field, white background, authentic and relatable, high quality portrait photography",
        "filename": "testimonials/amanda.jpg",
        "width": 512,
        "height": 512,
    },
    {
        "prompt": "Professional headshot portrait of a friendly smiling Korean man, age 45, glasses, casual business look, warm natural lighting, shallow depth of field, white background, authentic, high quality portrait photography",
        "filename": "testimonials/robert.jpg",
        "width": 512,
        "height": 512,
    },
    {
        "prompt": "Professional headshot portrait of a friendly smiling Vietnamese woman, age 33, shoulder length black hair, casual tech industry look, warm natural lighting, shallow depth of field, white background, authentic, high quality portrait photography",
        "filename": "testimonials/lisa.jpg",
        "width": 512,
        "height": 512,
    },
    {
        "prompt": "Professional headshot portrait of a friendly smiling man, age 56, gray hair, fit and healthy look, casual shirt, warm natural lighting, shallow depth of field, white background, authentic, high quality portrait photography",
        "filename": "testimonials/michael.jpg",
        "width": 512,
        "height": 512,
    },
    {
        "prompt": "Professional headshot portrait of a confident smiling woman, age 48, blonde highlighted hair, polished casual look, warm natural lighting, shallow depth of field, white background, authentic, high quality portrait photography",
        "filename": "testimonials/karen.jpg",
        "width": 512,
        "height": 512,
    },
    {
        "prompt": "Professional headshot portrait of a confident smiling Black man, age 44, short beard, fit and healthy, casual look, warm natural lighting, shallow depth of field, white background, authentic, high quality portrait photography",
        "filename": "testimonials/james.jpg",
        "width": 512,
        "height": 512,
    },
]

def run_batch(images, label):
    print(f"\n{'='*60}")
    print(f"Generating {label} ({len(images)} images)")
    print(f"{'='*60}")

    results = []
    # Run 3 at a time to avoid rate limits
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {}
        for img in images:
            w = img.get("width", 1024)
            h = img.get("height", 1024)
            f = executor.submit(generate_image, img["prompt"], img["filename"], w, h)
            futures[f] = img["filename"]

        for future in as_completed(futures):
            result = future.result()
            results.append((futures[future], result is not None))

    success = sum(1 for _, ok in results if ok)
    print(f"\n  {success}/{len(images)} generated successfully")
    return results

if __name__ == "__main__":
    print("FormBlends Image Generator")
    print(f"Output: {OUTPUT_DIR}")

    run_batch(product_images, "Product Images")
    run_batch(hero_images, "Hero/Brand Images")
    run_batch(testimonial_images, "Testimonial Avatars")

    print("\n\nDone!")
