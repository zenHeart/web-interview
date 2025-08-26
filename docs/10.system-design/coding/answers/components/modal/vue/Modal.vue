<template>
  <div
    v-if="show"
    class="modal-mask"
    ref="maskRef"
    @click.self="handleMaskClick"
    @keydown.esc="emitClose"
  >
    <div class="modal" role="dialog" aria-modal="true">
      <span class="close" @click="emitClose">&times;</span>
      <div class="modal-title">
        <slot name="title"> </slot>
      </div>
      <div class="modal-content">
        <slot> </slot>
      </div>
      <div class="modal-footer" v-if="footer !== false">
        <slot name="footer">
          <button class="modal-confirm" @click="handleConfirm">
            {{ confirmText }}
          </button>
          <button class="modal-cancel" @click="handleCancel">
            {{ cancelText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted, h, VNode } from "vue";

  const props = withDefaults(
    defineProps<{
      show: boolean;
      footer?: boolean;
      confirmText?: string;
      cancelText?: string;
      closeOnClickMask?: boolean;
    }>(),
    {
      show: false,
      footer: true,
      confirmText: "确定",
      cancelText: "取消",
      closeOnClickMask: true,
    }
  );

  const emit = defineEmits<{
    (e: "close"): void;
    (e: "confirm"): void;
    (e: "cancel"): void;
  }>();

  const maskRef = ref<HTMLElement | null>(null);

  const focusMask = () => {
    maskRef.value && maskRef.value.focus();
  };

  onMounted(() => {
    if (props.show) focusMask();
  });

  watch(
    () => props.show,
    (v) => {
      if (v) setTimeout(focusMask, 0);
    }
  );

  const emitClose = () => emit("close");
  const handleConfirm = () => emit("confirm");
  const handleCancel = () => emit("cancel");
  const handleMaskClick = () => {
    if (props.closeOnClickMask) emitClose();
  };


</script>

<style scoped>
  .modal-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    background: #fff;
    border-radius: 8px;
    min-width: 320px;
    padding: 24px 24px 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    max-width: 90%;
  }
  .close {
    position: absolute;
    top: 8px;
    right: 12px;
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
  }
  .modal-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .modal-content {
    font-size: 14px;
    line-height: 1.6;
  }
  .modal-footer {
    margin-top: 20px;
    text-align: right;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
  .modal-footer button {
    padding: 6px 14px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #d9d9d9;
    background: #fff;
  }
  .modal-footer .modal-confirm {
    background: #1677ff;
    color: #fff;
    border-color: #1677ff;
  }
  .modal-footer .modal-confirm:hover {
    filter: brightness(1.05);
  }
  .modal-footer .modal-cancel:hover {
    background: #f5f5f5;
  }
</style>
