<template>
    <Card style="width: 35rem; overflow: hidden; margin: auto;">
        <template #header>
        <RouterLink to="/Schedule/">
            <img id="nav_card_image" class="nav_card_image" alt="user header" src="@/assets/Eventverwaltung.png" />
        </RouterLink>
        </template>
        <template #title>
        <span class="nav_card_title">Eventverwaltung</span>
        <Button id="help_button_unittestTest" class="help_button" label="" icon="pi pi-question-circle" v-tooltip="{ value: 'Confirm to proceed', showDelay: 1000, hideDelay: 300 }"/>
        </template>
        <template #content>
        <Toolbar>
            <template #start>
            <Button id="add_unittestTest" class="add_unittestTest" data-pc-severity="none" label="Event hinzufügen" icon="pi pi-plus" severity="success"  @click.native="openNew" />
            </template>

            <template #end>
            <Button id="delete_unittestTest" class="delete_unittestTest" label="Event löschen" icon="pi pi-trash" @click="confirmDeleteSelected" :disabled="isDisabled" />
            </template>
        </Toolbar>
        </template>
    </Card>
</template>

<script setup lang="js">
import {onMounted, ref} from 'vue';

function openNew(params) {
    
}

function confirmDeleteSelected(params) {
    
}

function isDisabled(params) {
    return true;
}
</script>