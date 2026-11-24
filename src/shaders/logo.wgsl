struct Params {
    time: f32,
}
@group(0) @binding(0)
var<uniform> params: Params;

struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

@vertex
fn vs_main(@location(0) position: vec2f) -> VertexOut {
    var out: VertexOut;
    out.position = vec4f(position, 0.0, 1.0);
    out.uv = position * 0.5 + 0.5;
    return out;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
    let band = (uv.x + uv.y) * 0.5 - fract(params.time * 0.1);
    let sheen = smoothstep(0.32, 0.0, abs(band));
    let color = mix(vec3f(0.894, 0.357, 0.106), vec3f(1.0, 0.859, 0.4), sheen);
    return vec4f(color, 1.0);
}
