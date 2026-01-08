import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://micmnfcsbkprubwjhtpz.supabase.co'
const SUPABASE_KEY = 'sb_publishable_oV_0fAS28y1DRqJVv6Gi1w_4zwkefko'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function saveUserData(tableName, columnData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
        .from(tableName)
        .upsert({ id: user.id, ...columnData, updated_at: new Date() });
    
    if (error) console.error("Erro ao salvar dados:", error);
}
